import { prisma } from '@/lib/prisma'
import { transporter } from '@/lib/nodemailer'
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        
        // Generate verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Verification Code',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Verification Code</h2>
                    <p>Your verification code is: <strong>${verificationCode}</strong></p>
                    <p>This code will expire in 10 minutes.</p>
                </div>
            `
        };

        // Send email with error handling
        try {
            await transporter.sendMail(mailOptions);
            console.log("Verification email sent successfully");
            
            // Save the code to your database here
            // ...existing database code...
            const existingUser = await prisma.user.findUnique({
                where:{email}
            })
            if(existingUser && existingUser.isVerified){
                return new Response( 'user already exist' ,{status:401} )
            }
            if(existingUser){
                await prisma.user.update({
                    where:{email},
                    data: {verificationCode: verificationCode}
                })
            }else{
                await prisma.user.create({
                   data: {email , verificationCode:verificationCode}
                })
            }

            return NextResponse.json({ 
                message: "Verification code sent successfully" 
            }, { status: 200 });
            
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            return NextResponse.json({ 
                error: "Failed to send verification email" 
            }, { status: 500 });
        }

    } catch (error) {
        console.error("API route error:", error);
        return NextResponse.json({ 
            error: "Internal server error" 
        }, { status: 500 });
    }
}