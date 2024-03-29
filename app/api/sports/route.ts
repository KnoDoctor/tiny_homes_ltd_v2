export const dynamic = 'force-dynamic'; // defaults to auto
import prisma from '../../../prisma/prismaClientInstance';

export async function GET() {
  try {
    const allSports = await prisma.sports.findMany();

    return Response.json({
      success: true,
      data: allSports,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
      error: error,
    });
  }
}

export async function POST(request: Request) {
  try {
    const {
      name,
    }: {
      name: string;
      status: 'draft' | 'finalized' | 'cancelled' | 'in_progress' | 'complete';
    } = await request.json();

    if (!name) {
      return new Response(`Webhook error: name property is missing.`, {
        status: 400,
      });
    }

    const createdSport = await prisma.sports.create({
      data: {
        name,

        date: new Date().toISOString(),
      },
    });

    return Response.json({
      success: true,
      data: createdSport,
    });
  } catch (error) {
    console.log(error);
    return new Response(`Error: ${error}`, {
      status: 400,
    });
  }
}
