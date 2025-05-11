import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
    const { name,
        description,
        industry,
        website,
        location,
        foundedYear,
        contactEmail,
        phoneNumber,
        teamSize,
        socialLinks,
        figmaLink,
        domainName,
        needWebsite,
        goals,
        mission,
        specificFeatures } = await req.json()

          if (!name || !description || !industry || !contactEmail || !teamSize) {
    return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
  }

        await prisma.organization.create({
            data: {name,
        description,
        industry,
        website,
        location,
        foundedYear,
        contactEmail,
        phoneNumber,
        teamSize,
        socialLinks,
        figmaLink,
        domainName,
        needWebsite,
        goals,
        mission,
        specificFeatures}
        })

        return new Response(JSON.stringify({message: 'organization created successfully'}), {status:201})
}