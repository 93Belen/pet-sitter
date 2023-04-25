import { prisma } from "components/prisma/seed";


export async function POST(req: Request) {

    const { id, description, price } = await req.json();
    
    
    const responseFromPrisma = await prisma.pricing.update({
        where: {
            id: id
        },
        data: {
            description: description,
            price: price
        }
    })
  
    return new Response(JSON.stringify(responseFromPrisma));
  }
  