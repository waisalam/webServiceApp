import {prisma} from '@/lib/prisma'

export async function POST(req:Request) {
    const {email, code } = await req.json()

    const existingUser = await prisma.user.findUnique({where: {email}})

    if(!existingUser){
        return new Response('User not Found please go on register', {status:400})
    }
    if(existingUser && existingUser.isVerified){
        return new Response('Email is already verifyied' , {status:400})
    }
    if( existingUser.verificationCode !== code){
        return new Response('Please enter correct code', {status:401})
    }

    await prisma.user.update({
        where: {email},
        data: {isVerified: true , verificationCode: null}
    })

    return new Response(JSON.stringify({message:'email verification successful'}), {status:201})
}