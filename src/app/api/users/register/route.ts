import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
   if(!existingUser){
    return new Response('user not found', {status:400})
   }
   if(!existingUser.isVerified){
    return new Response('email not verified', {status:400})
   }

   if(existingUser.password){
    return new Response('user already registered', {status:401})
   }

   if (role !== "User") {
    return new Response("Invalid role", { status: 400 });
  }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    // update a  user

   const user = await prisma.user.update({
      where: { email },
      data: {
        name , password: hashedPassword, role
      }
    });

    return new Response(
      JSON.stringify({ message: "User registered successfully", user }),
      { status: 201 }
    );
  } catch (error) {
    return new Response("User creation failed", { status: 500 });
  }
}
