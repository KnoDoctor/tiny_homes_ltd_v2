export const dynamic = 'force-dynamic'; // defaults to auto
import prisma from '../../../../prisma/prismaClientInstance';

export async function GET(
  request: Request,
  { params }: { params: { identifier: string } },
) {
  try {
    const customer = await prisma.customers.findUnique({
      where: {
        id: params.identifier,
      },
    });

    return Response.json({
      success: true,
      data: customer,
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
      email,
      image_url,
    }: { name: string; email: string; image_url: string } =
      await request.json();

    const updatedCustomer = await prisma.customers.update({
      where: {
        id: params.identifier,
      },
      data: {
        name,
        email,
        image_url,
      },
    });

    return Response.json({
      success: true,
      data: updatedCustomer,
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
    const deletedCustomer = await prisma.customers.delete({
      where: {
        id: params.identifier,
      },
    });

    return Response.json({
      success: true,
      data: deletedCustomer,
    });
  } catch (error) {
    console.log(error);
    return new Response(`Error: ${error}`, {
      status: 400,
    });
  }
}
