import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
    try {
        const getHrDetails = await prisma.user.findMany({
            where: { 
                role: "HR",
                isVerified: true 
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }
        });

        if (!getHrDetails || getHrDetails.length === 0) {
            return new Response(
                JSON.stringify({ message: 'No HR users found' }), 
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                message: 'HR data retrieved successfully', 
                getHrDetails
            }), 
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching HR details:', error);
        return new Response(
            JSON.stringify({ message: 'Failed to fetch HR details' }), 
            { status: 500 }
        );
    }
}