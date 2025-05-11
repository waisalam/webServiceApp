import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
    const { email, password } = await req.json()

    const existingHR = await prisma.hr.findUnique({
        where: { email }
    })
    if (!existingHR) {
        return new Response('HR with this email not registered please sign up', { status: 400 })
    }

    const isMatch = await bcrypt.compare(password, existingHR.password)
    if (!isMatch) {
        return new Response('Password is incorrect', { status: 401 })
    }
    const secretJwt = process.env.JWT_SECRET || 's4df4a4f798sd1v6sdgvahiwuy398'
    const token = jwt.sign({ email, role: existingHR.role }, secretJwt)

    return new Response(JSON.stringify({ message: 'user loggedIn Successfully', token }), { status: 201 })


}