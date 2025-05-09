import {prisma} from '@/lib/prisma'
import { transporter } from '../register/nodemailer'

export async function POST(req:Request) {
    const {email} =await req.json()

    try {
        const existingUser = await prisma.user.findUnique({
            where:{email}
        })
if(existingUser && existingUser.isVerified){
    return new Response( 'user already exist' ,{status:401} )
}

const generatedCode = Math.floor(100000 * Math.random() + 900000).toString()
if(existingUser){
    await prisma.user.update({
        where:{email},
        data: {verificationCode: generatedCode}
    })
}else{
    await prisma.user.create({
       data: {email , verificationCode:generatedCode}
    })
}

const sendEmail = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to:email,
    subject:"verify your email",
    text:`your verification code ${generatedCode}`
})

return new Response(JSON.stringify({message: 'verification code send successfully'}), {status:201})

    } catch (error) {
        return new Response('error while sending the otp ', {status:409})
    }
}