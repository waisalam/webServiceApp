import { prisma } from "@/lib/prisma";
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
    const { email, password, role } = await req.json()
    if (role !== 'ADMIN') {
        return new Response('Please select admin for login as a admin')
    }

    const existingAdmin = await prisma.admin.findUnique({ where: { email } })

    if (!existingAdmin) {
        return new Response('you are not allowed to login as admin', { status: 400 })
    }
    if (existingAdmin.role !== role || existingAdmin.password !== password || existingAdmin.email !== email) {
        return new Response('invalid admin credentials ', { status: 401 })
    }
    const secterJWT = process.env.JWT_SECRET || 'fsdajoigsd54g8sd45631sd5fsd';

    const token = jwt.sign(email, secterJWT)
    return new Response(JSON.stringify({ message: 'Admin LoggedIn Successfully' }), { status: 201 })

}