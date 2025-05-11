import {prisma } from '@/lib/prisma'

export async function GET(req:Request) {
    const getOrgData = await prisma.organization.findMany()

    return new Response(JSON.stringify({message:'successfully got all organization details', getOrgData}), {status:201})
}