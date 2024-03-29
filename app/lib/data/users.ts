import { unstable_noStore as noStore } from 'next/cache';
import { formatCurrency } from '@/app/lib/utils';
import prisma from '@/prisma/prismaClientInstance';

const ITEMS_PER_PAGE = 6;

export async function fetchUsers() {
  noStore();
  try {
    const data = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const users = data;
    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all users.');
  }
}

export async function fetchFilteredUsers(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const users = await prisma.users.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy: {
        name: 'asc',
      },
    });

    // Processing the results to include the aggregations
    const processedUsers = users.map((user) => {
      // const total_invoices = user.invoices.length;
      // const total_pending = user.invoices.reduce(
      //   (acc, invoice) =>
      //     invoice.status === 'pending' ? acc + invoice.amount : acc,
      //   0,
      // );
      // const total_paid = user.invoices.reduce(
      //   (acc, invoice) =>
      //     invoice.status === 'paid' ? acc + invoice.amount : acc,
      //   0,
      // );

      return {
        ...user,
        // total_invoices,
        // total_pending: formatCurrency(total_pending),
        // total_paid: formatCurrency(total_paid),
      };
    });

    return processedUsers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch user data.');
  }
}

export async function fetchUsersPages(query: string) {
  noStore();
  try {
    const count = await prisma.users.count({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            email: {
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
    throw new Error('Failed to fetch total number of users.');
  }
}

export async function fetchUserById(id: string) {
  noStore();
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        // If you need to fetch related invoices data, you can include it here
        // invoices: {
        //   select: {
        //     id: true,
        //     amount: true,
        //     status: true,
        //     date: true,
        //   },
        // },
      },
    });

    return user;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user by ID.');
  }
}
