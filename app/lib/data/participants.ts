import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/prisma/prismaClientInstance';

const ITEMS_PER_PAGE = 6;

export async function fetchParticipants() {
  noStore();
  try {
    const data = await prisma.participants.findMany({
      select: {
        id: true,
        // sport_id: true,
        user_id: true,
        study_id: true,
        name: true,
        is_control: true,
        // sport: true,
        study: true,
        user: true,
      },
    });

    const participants = data;
    return participants;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all participants.');
  }
}

export async function fetchFilteredParticipants(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const participants = await prisma.participants.findMany({
      where: {
        OR: [
          {
            user: {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      select: {
        id: true,
        // sport_id: true,
        user_id: true,
        study_id: true,
        name: true,
        is_control: true,
        // sport: true,
        user: true,
        study: true,
        responses: { select: { id: true, status: true } },
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy: {
        name: 'asc',
      },
    });

    // Processing the results to include the aggregations
    const processedStudies = participants.map((participant) => {
      const total_responses = participant.responses.length;

      const total_in_progress = participant.responses.filter(
        (response) => response.status === 'in_progress',
        0,
      ).length;
      const total_complete = participant.responses.filter(
        (response) => response.status === 'complete',
        0,
      ).length;

      return {
        ...participant,
        total_responses,
        total_in_progress,
        total_complete,
      };
    });

    return processedStudies;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch participant data.');
  }
}

export async function fetchParticipantsPages(query: string) {
  noStore();
  try {
    const count = await prisma.participants.count({
      where: {
        OR: [
          {
            user: {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of participants.');
  }
}

export async function fetchParticipantById(id: string) {
  noStore();
  try {
    const participant = await prisma.participants.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        // sport_id: true,
        user_id: true,
        study_id: true,
        name: true,
        is_control: true,
        // sport: true,
        study: true,
        user: true,
      },
    });

    return participant;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch participant by ID.');
  }
}
