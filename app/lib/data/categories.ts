import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/prisma/prismaClientInstance';

const ITEMS_PER_PAGE = 6;

export async function fetchCategories() {
  noStore();
  try {
    const data = await prisma.categories.findMany({
      select: {
        id: true,
        name: true,
        posts: true,
      },
    });

    const categories = data;
    return categories;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all categories.');
  }
}

export async function fetchFilteredCategories(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const categories = await prisma.categories.findMany({
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
        posts: true,
        // athletes: {
        //   select: {
        //     id: true,
        //     name: true,
        //   },
        // },
        // studies: {
        //   select: {
        //     id: true,
        //     name: true,
        //   },
        // },
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy: {
        name: 'asc',
      },
    });

    // Processing the results to include the aggregations
    // const processedCategories = categories.map((category) => {
    //   const total_athletes = category.athletes.length;
    //   const total_studies = category.studies.length;

    //   return {
    //     ...category,
    //     total_athletes,
    //     total_studies,
    //   };
    // });

    return categories;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch category data.');
  }
}

export async function fetchCategoriesPages(query: string) {
  noStore();
  try {
    const count = await prisma.categories.count({
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
    throw new Error('Failed to fetch total number of categories.');
  }
}

export async function fetchCategoryById(id: string) {
  noStore();
  try {
    const category = await prisma.categories.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        posts: true,
      },
    });

    return category;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch category by ID.');
  }
}
