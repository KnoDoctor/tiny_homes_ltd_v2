export const dynamic = 'force-dynamic'; // defaults to auto
import prisma from '../../../../prisma/prismaClientInstance';

export async function GET(
  request: Request,
  { params }: { params: { identifier: string } },
) {
  try {
    const invoice = await prisma.invoices.findUnique({
      where: {
        id: params.identifier,
      },
    });

    return Response.json({
      success: true,
      data: invoice,
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
    const { amount, status }: { amount: number; status: 'pending' | 'paid' } =
      await request.json();

    const updatedInvoice = await prisma.invoices.update({
      where: {
        id: params.identifier,
      },
      data: {
        amount,
        status,
      },
    });

    return Response.json({
      success: true,
      data: updatedInvoice,
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
    const deletedInvoice = await prisma.invoices.delete({
      where: {
        id: params.identifier,
      },
    });

    return Response.json({
      success: true,
      data: deletedInvoice,
    });
  } catch (error) {
    console.log(error);
    return new Response(`Error: ${error}`, {
      status: 400,
    });
  }
}
