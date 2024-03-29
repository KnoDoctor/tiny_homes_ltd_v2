'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '@/prisma/prismaClientInstance';

export type State = {
  errors?: {
    participantId?: string[];
    athleteId?: string[];
    studyId?: string[];
    status?: string[];
  };
  message?: string | null;
};

//This sets the zod Schema for the Response Form, it defines the form validation logic for the studie database entity
const ResponseFormSchema = z.object({
  id: z.string(),
  participantId: z.string({
    invalid_type_error: 'Please select a participant.',
  }),
  athleteId: z.string({
    invalid_type_error: 'Please select a athlete.',
  }),
  status: z.enum(['in_progress', 'complete'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  dateSent: z.string(),
});

// Use Zod to update the expected types
const CreateResponse = ResponseFormSchema.omit({ id: true, dateSent: true });
export async function createResponse(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateResponse.safeParse({
    participantId: formData.get('participantId'),
    athleteId: formData.get('athleteId'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Response.',
    };
  }

  // Prepare data for insertion into the database
  const { participantId, athleteId, status } = validatedFields.data;

  const date_sent = new Date();

  // Insert data into the database
  try {
    await prisma.responses.create({
      data: {
        participant_id: participantId,
        athlete_id: athleteId,
        status,
        date_sent,
      },
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Response.',
    };
  }

  // Revalidate the cache for the responses page and redirect the user.
  revalidatePath('/dashboard/responses');
  redirect('/dashboard/responses');
}

// Use Zod to update the expected types
const UpdateResponse = ResponseFormSchema.omit({ id: true, dateSent: true });
export async function updateResponse(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateResponse.safeParse({
    participantId: formData.get('participantId'),
    athleteId: formData.get('athleteId'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    console.log({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Response.',
    });
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Response.',
    };
  }

  // Prepare data for insertion into the database
  const { participantId, athleteId, status } = validatedFields.data;

  try {
    await prisma.responses.update({
      where: {
        id,
      },
      data: {
        participant_id: participantId,
        athlete_id: athleteId,
        status,
      },
    });
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Response.' };
  }

  revalidatePath('/dashboard/responses');
  redirect('/dashboard/responses');
}

export async function deleteResponse(id: string) {
  // throw new Error('Failed to Delete Response');
  try {
    await prisma.responses.delete({
      where: {
        id,
      },
    });

    revalidatePath('/dashboard/responses');

    return { message: 'Deleted Response.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Response.' };
  }
}
