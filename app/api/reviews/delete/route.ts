import { prisma } from "components/prisma/seed";

export async function POST(req: Request) {

    const { idToDelete } = await req.json();  
    const responseFromPrisma = await prisma.review.delete({
        where: {
            id: idToDelete
        }
    })
  
    return new Response(JSON.stringify(responseFromPrisma));
  }
  