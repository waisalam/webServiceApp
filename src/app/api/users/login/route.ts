import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return new Response("User with this email not registered", { status: 401 });
  }
  if (!user.password) {
    return new Response("No password set for this account", { status: 400 });
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return new Response("Wrong Password please try again ", { status: 401 });
  }

  return new Response(
    JSON.stringify({ message: "user logged in Successfully" }),
    { status: 201 }
  );
}
