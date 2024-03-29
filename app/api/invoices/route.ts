export const dynamic = 'force-dynamic'; // defaults to auto
import prisma from '../../../prisma/prismaClientInstance';

export async function GET() {
  try {
    const allInvoices = await prisma.invoices.findMany();

    return Response.json({
      success: true,
      data: allInvoices,
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
      customer_id,
      amount,
      status,
    }: {
      customer_id: string;
      amount: number;
      status: 'pending' | 'paid';
      date: string;
    } = await request.json();

    if (!customer_id) {
      return new Response(`Webhook error: customer_id property is missing.`, {
        status: 400,
      });
    }
    if (!amount) {
      return new Response(`Webhook error: amount property is missing.`, {
        status: 400,
      });
    }
    if (!status) {
      return new Response(`Webhook error: status property is missing.`, {
        status: 400,
      });
    }

    const createdInvoice = await prisma.invoices.create({
      data: {
        customer_id,
        amount,
        status,
        date: new Date().toISOString(),
      },
    });

    return Response.json({
      success: true,
      data: createdInvoice,
    });
  } catch (error) {
    console.log(error);
    return new Response(`Error: ${error}`, {
      status: 400,
    });
  }
}
