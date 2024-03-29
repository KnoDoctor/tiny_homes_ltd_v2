import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/prisma/prismaClientInstance';

const ITEMS_PER_PAGE = 6;

export async function fetchLatestResponses() {
  noStore();
  try {
    const latestResponses = await prisma.responses.findMany({
      select: {
        date_sent: true,
        status: true,
        participant: {
          select: {
            user: true,
            study: true,
          },
        },
        athlete: true,
        id: true,
      },
      orderBy: {
        date_sent: 'desc',
      },
      take: 5,
    });

    return latestResponses.map((response) => ({
      ...response,
      // amount: formatCurrency(invoice.amount),
      // name: invoice.customer.name,
      // image_url: invoice.customer.image_url,
      // email: invoice.customer.email,
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchResponses() {
  noStore();
  try {
    const data = await prisma.responses.findMany({
      select: {
        id: true,
        participant_id: true,
        athlete_id: true,
        status: true,
        date_sent: true,
        participant: true,
        athlete: true,
      },
    });

    const responses = data;
    return responses;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all responses.');
  }
}

export async function fetchFilteredResponses(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const responses = await prisma.responses.findMany({
      // where: {
      //   OR: [
      //     {
      //       status: {
      //         contains: query,
      //         mode: 'insensitive',
      //       },
      //     },
      //   ],
      // },
      select: {
        id: true,
        participant_id: true,
        athlete_id: true,
        status: true,
        date_sent: true,
        participant: {
          include: {
            user: true,
            study: true,
          },
        },
        athlete: true,
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy: {
        date_sent: 'asc',
      },
    });

    return responses;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch response data.');
  }
}

export async function fetchResponsesPages(query: string) {
  noStore();
  try {
    const count = await prisma.responses.count({
      // where: {
      //   OR: [
      //     {
      //       status: {
      //         contains: query,
      //         mode: 'insensitive',
      //       },
      //     },
      //   ],
      // },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of responses.');
  }
}

export async function fetchResponseById(id: string) {
  noStore();
  try {
    const response = await prisma.responses.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        participant_id: true,
        athlete_id: true,
        status: true,
        date_sent: true,
        participant: true,
        athlete: true,
      },
    });

    return response;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch response by ID.');
  }
}
