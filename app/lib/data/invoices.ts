import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/prisma/prismaClientInstance';
import { formatCurrency } from '../utils';

const ITEMS_PER_PAGE = 6;
export async function fetchLatestInvoices() {
  noStore();
  try {
    const latestInvoices = await prisma.invoices.findMany({
      select: {
        amount: true,
        customer: {
          select: {
            name: true,
            image_url: true,
            email: true,
          },
        },
        id: true,
      },
      orderBy: {
        date: 'desc',
      },
      take: 5,
    });

    return latestInvoices.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
      name: invoice.customer.name,
      image_url: invoice.customer.image_url,
      email: invoice.customer.email,
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await prisma.invoices.findMany({
      where: {
        OR: [
          {
            customer: {
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
          },
        ],
      },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
            image_url: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await prisma.invoices.count({
      where: {
        OR: [
          {
            customer: {
              name: {
                contains: query,
                mode: 'insensitive',
              },
              email: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
          //   {
          //     amount: {
          //       contains: query,
          //       mode: 'insensitive',
          //     },
          //   },
          //   {
          //     date: {
          //       contains: query,
          //       mode: 'insensitive',
          //     },
          //   },
          //   {
          //     status: {
          //       contains: query,
          //       mode: 'insensitive',
          //     },
          //   },
        ],
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const invoice = await prisma.invoices.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        customer_id: true,
        amount: true,
        status: true,
      },
    });

    if (invoice) {
      return {
        ...invoice,
        amount: invoice.amount / 100,
      };
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}
