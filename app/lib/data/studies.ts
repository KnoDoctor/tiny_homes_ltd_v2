import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/prisma/prismaClientInstance';

const ITEMS_PER_PAGE = 6;

export async function fetchStudies() {
  noStore();
  try {
    const data = await prisma.studies.findMany({
      select: {
        id: true,
        sport_id: true,
        name: true,
        sport: true,
      },
    });

    const studies = data;
    return studies;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all studies.');
  }
}

export async function fetchFilteredStudies(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const studies = await prisma.studies.findMany({
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
        status: true,
        sport: true,
        participants: {
          include: {
            responses: true,
          },
        },

        // responses: { select: { id: true, status: true } },
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy: {
        name: 'asc',
      },
    });

    // Processing the results to include the aggregations
    const processedStudies = studies.map((study) => {
      const total_participants = study.participants.length;

      let total_in_progress = 0;

      study.participants.forEach((participant) => {
        participant.responses.forEach((response) => {
          if (response.status === 'in_progress') {
            total_in_progress++;
          }
        });
      });

      let total_complete = 0;

      study.participants.forEach((participant) => {
        participant.responses.forEach((response) => {
          if (response.status === 'complete') {
            total_complete++;
          }
        });
      });

      // const total_in_progress = study.participants.filter((participant) =>
      //   participant.responses.map(
      //     (response) => response.status === 'in_progress',
      //     0,
      //   ),
      // ).length;
      // const total_complete = study.responses.filter(
      //   (response) => response.status === 'complete',
      //   0,
      // ).length;

      return {
        ...study,
        total_participants,
        total_in_progress,
        total_complete,
      };
    });

    return processedStudies;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch study data.');
  }
}

export async function fetchStudiesPages(query: string) {
  noStore();
  try {
    const count = await prisma.studies.count({
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
    throw new Error('Failed to fetch total number of studies.');
  }
}

export async function fetchStudyById(id: string) {
  noStore();
  try {
    const study = await prisma.studies.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        sport_id: true,
        name: true,
        status: true,
        sport: true,
      },
    });

    return study;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch study by ID.');
  }
}
