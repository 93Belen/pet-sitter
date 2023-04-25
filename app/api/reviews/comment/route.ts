import { prisma } from "components/prisma/seed";

export async function POST(req: Request) {

    const { id, answer } = await req.json();  
    const responseFromPrisma = await prisma.review.update({
        where: {
            id: id
        },
        data: {
            answer: answer
        }
    })
  
    return new Response(JSON.stringify(responseFromPrisma));
  }
  