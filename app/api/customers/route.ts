export const dynamic = 'force-dynamic'; // defaults to auto
import prisma from '../../../prisma/prismaClientInstance';

export async function GET() {
  try {
    const allCustomers = await prisma.customers.findMany();

    return Response.json({
      success: true,
      data: allCustomers,
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
      email,
      image_url,
    }: { name: string; email: string; image_url: string } =
      await request.json();

    if (!name) {
      return new Response(`Webhook error: name property is missing.`, {
        status: 400,
      });
    }
    if (!email) {
      return new Response(`Webhook error: email property is missing.`, {
        status: 400,
      });
    }
    if (!image_url) {
      return new Response(`Webhook error: image_url property is missing.`, {
        status: 400,
      });
    }

    const createdCustomer = await prisma.customers.create({
      data: {
        name,
        email,
        image_url,
      },
    });

    return Response.json({
      success: true,
      data: createdCustomer,
    });
  } catch (error) {
    console.log(error);
    return new Response(`Error: ${error}`, {
      status: 400,
    });
  }
}
