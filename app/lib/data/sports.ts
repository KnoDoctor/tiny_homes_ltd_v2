import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/prisma/prismaClientInstance';

const ITEMS_PER_PAGE = 6;

export async function fetchSports() {
  noStore();
  try {
    const data = await prisma.sports.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const sports = data;
    return sports;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all sports.');
  }
}

export async function fetchFilteredSports(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const sports = await prisma.sports.findMany({
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
        name: true,
        athletes: {
          select: {
            id: true,
            name: true,
          },
        },
        studies: {
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
    const processedSports = sports.map((sport) => {
      const total_athletes = sport.athletes.length;
      const total_studies = sport.studies.length;

      return {
        ...sport,
        total_athletes,
        total_studies,
      };
    });

    return processedSports;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch sport data.');
  }
}

export async function fetchSportsPages(query: string) {
  noStore();
  try {
    const count = await prisma.sports.count({
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
    throw new Error('Failed to fetch total number of sports.');
  }
}

export async function fetchSportById(id: string) {
  noStore();
  try {
    const sport = await prisma.sports.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return sport;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sport by ID.');
  }
}
