import { unstable_noStore as noStore } from 'next/cache';
import { formatCurrency } from '@/app/lib/utils';
import prisma from '@/prisma/prismaClientInstance';

const ITEMS_PER_PAGE = 6;

export async function fetchCustomers() {
  noStore();
  try {
    const data = await prisma.customers.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const customers = data;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const customers = await prisma.customers.findMany({
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
        image_url: true,
        invoices: {
          select: {
            id: true,
            amount: true,
            status: true,
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
    const processedCustomers = customers.map((customer) => {
      const total_invoices = customer.invoices.length;
      const total_pending = customer.invoices.reduce(
        (acc, invoice) =>
          invoice.status === 'pending' ? acc + invoice.amount : acc,
        0,
      );
      const total_paid = customer.invoices.reduce(
        (acc, invoice) =>
          invoice.status === 'paid' ? acc + invoice.amount : acc,
        0,
      );

      return {
        ...customer,
        total_invoices,
        total_pending: formatCurrency(total_pending),
        total_paid: formatCurrency(total_paid),
      };
    });

    return processedCustomers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer data.');
  }
}

export async function fetchCustomersPages(query: string) {
  noStore();
  try {
    const count = await prisma.customers.count({
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
    throw new Error('Failed to fetch total number of customers.');
  }
}

export async function fetchCustomerById(id: string) {
  noStore();
  try {
    const customer = await prisma.customers.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
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

    return customer;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer by ID.');
  }
}
