import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
    const getHrDetails = await prisma.hr.findMany({
        where: { role: "HR" },
        select: {
            name: true,
            email: true,
            password: true,
            role: true,
            createdAt: true
        }
    })

    return new Response(JSON.stringify({message:'Data of HR', getHrDetails}), {status:201})
}