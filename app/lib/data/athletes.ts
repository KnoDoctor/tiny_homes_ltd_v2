import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/prisma/prismaClientInstance';

const ITEMS_PER_PAGE = 6;

export async function fetchAthletes() {
  noStore();
  try {
    const data = await prisma.athletes.findMany({
      select: {
        id: true,
        sport_id: true,
        name: true,
        sport: true,
        bias_statements: true,
      },
    });

    const athletes = data;
    return athletes;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all athletes.');
  }
}

export async function fetchFilteredAthletes(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const athletes = await prisma.athletes.findMany({
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
        sport_id: true,
        name: true,
        sport: true,
        bias_statements: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy: {
        name: 'asc',
      },
    });

    // Processing the results to include the aggregations
    const processedAthletes = athletes.map((athlete) => {
      // const total_athletes = athlete.athletes.length;
      const total_bias_statements = athlete.bias_statements.length;

      return {
        ...athlete,
        // total_athletes,
        total_bias_statements,
      };
    });

    return processedAthletes;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch athlete data.');
  }
}

export async function fetchAthletesPages(query: string) {
  noStore();
  try {
    const count = await prisma.athletes.count({
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
    throw new Error('Failed to fetch total number of athletes.');
  }
}

export async function fetchAthleteById(id: string) {
  noStore();
  try {
    const athlete = await prisma.athletes.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        sport_id: true,
        name: true,
        sport: true,
        bias_statements: true,
      },
    });

    return athlete;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch athlete by ID.');
  }
}
