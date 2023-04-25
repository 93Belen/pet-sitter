import { prisma } from "components/prisma/seed";

export async function GET() {
    const responseFromPrisma = await prisma.pricing.findMany();

    return new Response(JSON.stringify(responseFromPrisma));
}
