import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Revenue } from './definitions';
import { formatCurrency } from './utils';
import prisma from '@/prisma/prismaClientInstance';

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // Initialize multiple queries in parallel
    const studiesCountPromise = prisma.studies.count();
    const athletesCountPromise = prisma.athletes.count();
    const participantsCountPromise = prisma.participants.count();
    const responsesCountPromise = prisma.responses.count();
    const invoiceStatusPromise = prisma.invoices.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: 'paid',
      },
    });
    const invoicePendingStatusPromise = prisma.invoices.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: 'pending',
      },
    });

    const [
      numberOfStudies,
      numberOfAthletes,
      numberOfResponses,
      numberOfParticipants,
      totalPaidResult,
      totalPendingResult,
    ] = await Promise.all([
      studiesCountPromise,
      athletesCountPromise,
      responsesCountPromise,
      participantsCountPromise,
      invoiceStatusPromise,
      invoicePendingStatusPromise,
    ]);

    const totalPaidInvoices = formatCurrency(totalPaidResult._sum.amount ?? 0);
    const totalPendingInvoices = formatCurrency(
      totalPendingResult._sum.amount ?? 0,
    );

    return {
      numberOfAthletes,
      numberOfStudies,
      numberOfResponses,
      numberOfParticipants,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}
