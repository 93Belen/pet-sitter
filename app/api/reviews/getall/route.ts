import { prisma } from "components/prisma/seed";

export async function GET() {
    const responseFromPrisma = await prisma.review.findMany();

    return new Response(JSON.stringify(responseFromPrisma));
}
