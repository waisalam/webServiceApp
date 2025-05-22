import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    // Validate input
    if (!name || !email || !password || !role) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    // Check if user exists but hasn't completed registration
    if (existingUser) {
      if (existingUser.password) {
        return new Response(
          JSON.stringify({ message: "User already registered" }),
          { status: 400 }
        );
      }

      // Update existing user with password and name
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          name,
          password: hashedPassword,
          role,
          isVerified: true,
        },
      });

      return new Response(
        JSON.stringify({
          message: "Registration completed successfully",
          user: {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
          },
        }),
        { status: 201 }
      );
    }

    // Create new user if doesn't exist
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        isVerified: true,
      },
    });

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({ message: "Registration failed" }),
      { status: 500 }
    );
  }
}