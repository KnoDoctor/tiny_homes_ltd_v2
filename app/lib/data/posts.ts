import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/prisma/prismaClientInstance';

const ITEMS_PER_PAGE = 6;

export async function fetchPosts() {
  noStore();
  try {
    const data = await prisma.posts.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        image_url: true,
        date_created: true,
        user_id: true,
        user: true,
        category_id: true,
        category: true,
      },
    });

    const posts = data;
    return posts;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all posts.');
  }
}

export async function fetchFilteredPosts(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const posts = await prisma.posts.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        content: true,
        image_url: true,
        date_created: true,
        user_id: true,
        user: true,
        category_id: true,
        category: true,
        // responses: { select: { id: true, status: true } },
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy: {
        title: 'asc',
      },
    });

    // Processing the results to include the aggregations
    // const processedPosts = posts.map((post) => {
    //   const total_participants = post.participants.length;

    //   let total_in_progress = 0;

    //   post.participants.forEach((participant) => {
    //     participant.responses.forEach((response) => {
    //       if (response.status === 'in_progress') {
    //         total_in_progress++;
    //       }
    //     });
    //   });

    //   let total_complete = 0;

    //   post.participants.forEach((participant) => {
    //     participant.responses.forEach((response) => {
    //       if (response.status === 'complete') {
    //         total_complete++;
    //       }
    //     });
    //   });

    //   // const total_in_progress = post.participants.filter((participant) =>
    //   //   participant.responses.map(
    //   //     (response) => response.status === 'in_progress',
    //   //     0,
    //   //   ),
    //   // ).length;
    //   // const total_complete = post.responses.filter(
    //   //   (response) => response.status === 'complete',
    //   //   0,
    //   // ).length;

    //   return {
    //     ...post,
    //     total_participants,
    //     total_in_progress,
    //     total_complete,
    //   };
    // });

    return posts;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch post data.');
  }
}

export async function fetchPostsPages(query: string) {
  noStore();
  try {
    const count = await prisma.posts.count({
      where: {
        OR: [
          {
            title: {
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
    throw new Error('Failed to fetch total number of posts.');
  }
}

export async function fetchPostById(id: string) {
  noStore();
  try {
    const post = await prisma.posts.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        image_url: true,
        date_created: true,
        user_id: true,
        user: true,
        category_id: true,
        category: true,
      },
    });

    return post;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post by ID.');
  }
}
