export const dynamic = 'force-dynamic'; // defaults to auto
import prisma from '../../../../prisma/prismaClientInstance';

export async function GET(
  request: Request,
  { params }: { params: { identifier: string } },
) {
  try {
    const study = await prisma.studies.findUnique({
      where: {
        id: params.identifier,
      },
    });

    return Response.json({
      success: true,
      data: study,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
      error: error,
    });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { identifier: string } },
) {
  try {
    const {
      name,
      status,
      bias_id,
      sport_id,
    }: {
      name: string;
      sport_id: string;
      bias_id: string;
      status: 'draft' | 'finalized' | 'cancelled' | 'in_progress' | 'complete';
    } = await request.json();

    const updatedStudy = await prisma.studies.update({
      where: {
        id: params.identifier,
      },
      data: {
        name,
        status,
        bias_id,
        sport_id,
      },
    });

    return Response.json({
      success: true,
      data: updatedStudy,
    });
  } catch (error) {
    console.log(error);
    return new Response(`Error: ${error}`, {
      status: 400,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { identifier: string } },
) {
  try {
    const deletedStudy = await prisma.studies.delete({
      where: {
        id: params.identifier,
      },
    });

    return Response.json({
      success: true,
      data: deletedStudy,
    });
  } catch (error) {
    console.log(error);
    return new Response(`Error: ${error}`, {
      status: 400,
    });
  }
}
