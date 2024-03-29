import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/prisma/prismaClientInstance';

const ITEMS_PER_PAGE = 6;

export async function fetchBiases() {
  noStore();
  try {
    const data = await prisma.biases.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const biases = data;
    return biases;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all biases.');
  }
}

export async function fetchFilteredBiases(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const biases = await prisma.biases.findMany({
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
        // athletes: {
        //   select: {
        //     id: true,
        //     name: true,
        //   },
        // },
        studies: {
          select: {
            id: true,
            name: true,
          },
        },
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
    const processedBiases = biases.map((bias) => {
      // const total_athletes = bias.athletes.length;
      const total_studies = bias.studies.length;
      const total_bias_statements = bias.bias_statements.length;

      return {
        ...bias,
        // total_athletes,
        total_studies,
        total_bias_statements,
      };
    });

    return processedBiases;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch bias data.');
  }
}

export async function fetchBiasesPages(query: string) {
  noStore();
  try {
    const count = await prisma.biases.count({
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
    throw new Error('Failed to fetch total number of biases.');
  }
}

export async function fetchBiasById(id: string) {
  noStore();
  try {
    const bias = await prisma.biases.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return bias;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bias by ID.');
  }
}
