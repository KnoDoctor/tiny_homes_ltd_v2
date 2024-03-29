import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/prisma/prismaClientInstance';

const ITEMS_PER_PAGE = 6;

export async function fetchBiasStatements() {
  noStore();
  try {
    const data = await prisma.bias_statements.findMany({
      select: {
        id: true,
        bias_id: true,
        athlete_id: true,
        name: true,
        bias: true,
        athlete: { include: { sport: true } },
      },
    });

    const biasStatements = data;
    return biasStatements;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all bias statements.');
  }
}

export async function fetchFilteredBiasStatements(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const biasStatements = await prisma.bias_statements.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        bias_id: true,
        athlete_id: true,
        name: true,
        bias: true,
        athlete: { include: { sport: true } },
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy: {
        name: 'asc',
      },
    });

    return biasStatements;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch athlete data.');
  }
}

export async function fetchBiasStatementsPages(query: string) {
  noStore();
  try {
    const count = await prisma.bias_statements.count({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of bias statements.');
  }
}

export async function fetchBiasStatementById(id: string) {
  noStore();
  try {
    const athlete = await prisma.bias_statements.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        bias_id: true,
        athlete_id: true,
        name: true,
        bias: true,
        athlete: { include: { sport: true } },
      },
    });

    return athlete;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch athlete by ID.');
  }
}
