export const dynamic = 'force-dynamic'; // defaults to auto
import prisma from '../../../prisma/prismaClientInstance';

export async function GET() {
  try {
    const allStudies = await prisma.studies.findMany();

    return Response.json({
      success: true,
      data: allStudies,
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
      sport_id,
      bias_id,
      status,
    }: {
      name: string;
      sport_id: string;
      bias_id: string;
      status: 'draft' | 'finalized' | 'cancelled' | 'in_progress' | 'complete';
    } = await request.json();

    if (!name) {
      return new Response(`Webhook error: name property is missing.`, {
        status: 400,
      });
    }
    if (!sport_id) {
      return new Response(`Webhook error: sport_id property is missing.`, {
        status: 400,
      });
    }
    if (!bias_id) {
      return new Response(`Webhook error: bias_id property is missing.`, {
        status: 400,
      });
    }
    if (!status) {
      return new Response(`Webhook error: amount property is missing.`, {
        status: 400,
      });
    }

    const createdStudy = await prisma.studies.create({
      data: {
        name,
        sport_id,
        bias_id,
        status,
        date: new Date().toISOString(),
      },
    });

    return Response.json({
      success: true,
      data: createdStudy,
    });
  } catch (error) {
    console.log(error);
    return new Response(`Error: ${error}`, {
      status: 400,
    });
  }
}
