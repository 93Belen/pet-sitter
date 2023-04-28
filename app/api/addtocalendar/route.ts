import { prisma } from "components/prisma/seed";

export async function POST(req: Request) {

    const { availabilities } = await req.json();
    await prisma.availability.deleteMany({})
    const responseFromPrisma = await prisma.availability.createMany({
        data: availabilities,
        skipDuplicates: true
    })
  
    return new Response(JSON.stringify(responseFromPrisma));
  }
  