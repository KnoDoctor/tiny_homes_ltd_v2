export const dynamic = 'force-dynamic'; // defaults to auto
import prisma from '../../../../prisma/prismaClientInstance';

export async function GET(
  request: Request,
  { params }: { params: { identifier: string } },
) {
  try {
    const sport = await prisma.sports.findUnique({
      where: {
        id: params.identifier,
      },
    });

    return Response.json({
      success: true,
      data: sport,
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
    }: {
      name: string;
    } = await request.json();

    const updatedSport = await prisma.sports.update({
      where: {
        id: params.identifier,
      },
      data: {
        name,
      },
    });

    return Response.json({
      success: true,
      data: updatedSport,
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
    const deletedSport = await prisma.sports.delete({
      where: {
        id: params.identifier,
      },
    });

    return Response.json({
      success: true,
      data: deletedSport,
    });
  } catch (error) {
    console.log(error);
    return new Response(`Error: ${error}`, {
      status: 400,
    });
  }
}
