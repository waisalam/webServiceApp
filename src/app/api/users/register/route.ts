import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 400 }
      );
    }

    if (!existingUser.isVerified) {
      return new Response(
        JSON.stringify({ message: "Email not verified" }),
        { status: 400 }
      );
    }

    if (existingUser.password) {
      return new Response(
        JSON.stringify({ message: "User already registered" }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user with name, password, and role
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name,
        password: hashedPassword,
        role: "Admin", // Always set role as Admin
      },
    });

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
        },
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({ message: "Registration failed" }),
      { status: 500 }
    );
  }
}
