import {prisma} from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST( req :Request) {
    const {name , email , password} = await req.json()

    const existingHR = await prisma.hr.findUnique({
        where: {email}
    })
if(existingHR){
    return new Response('HR already Registered', {status:401})
}

const hashedPassword = await bcrypt.hash(password, 10)
const hr = await prisma.hr.create({
    data :{name , email , password: hashedPassword}
})

const secretToken = process.env.JWT_SECRET || 'sf4a64dsg7s8d4g65fdsgfdsg7896'
const token = await jwt.sign({email, role : hr.role}, secretToken)

return new Response(JSON.stringify({message: 'HR created successfully', token}), {status:201})

}
