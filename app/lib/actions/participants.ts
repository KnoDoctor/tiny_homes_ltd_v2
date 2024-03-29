'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '@/prisma/prismaClientInstance';

export type State = {
  errors?: {
    name?: string[];
    isControl?: string[];
    userId?: string[];
    studyId?: string[];
  };
  message?: string | null;
};

//This sets the zod Schema for the Participant Form, it defines the form validation logic for the studie database entity
const ParticipantFormSchema = z.object({
  id: z.string(),
  // name: z
  //   .string({ invalid_type_error: 'Please enter a participant name' })
  //   .min(6, 'The name should be descriptive'),
  isControl: z.string({
    invalid_type_error:
      'Please indicate whether the participant is in the control group.',
  }),
  userId: z.string({
    invalid_type_error: 'Please select a user.',
  }),
  studyId: z.string({
    invalid_type_error: 'Please select a study.',
  }),
  returnPath: z.optional(z.string()),
});

// Use Zod to update the expected types
const CreateParticipant = ParticipantFormSchema.omit({ id: true });
export async function createParticipant(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateParticipant.safeParse({
    // name: formData.get('name'),
    userId: formData.get('userId'),
    studyId: formData.get('studyId'),
    isControl: formData.get('isControl'),
    returnPath: formData.get('returnPath'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Participant.',
    });
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Participant.',
    };
  }

  // Prepare data for insertion into the database
  const { userId, studyId, isControl, returnPath } = validatedFields.data;

  const now = new Date();

  // Insert data into the database
  try {
    await prisma.participants.create({
      data: {
        // name,
        date_created: now,
        user_id: userId,
        study_id: studyId,
        is_control: isControl === 'true' ? true : false,
      },
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error);
    return {
      message: 'Database Error: Failed to Create Participant.',
    };
  }

  // Revalidate the cache for the participants page and redirect the user.
  revalidatePath(returnPath || '/dashboard/participants');
  redirect(returnPath || '/dashboard/participants');
}

// Use Zod to update the expected types
const UpdateParticipant = ParticipantFormSchema.omit({ id: true });
export async function updateParticipant(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateParticipant.safeParse({
    // name: formData.get('name'),
    userId: formData.get('userId'),
    studyId: formData.get('studyId'),
    isControl: formData.get('isControl'),
    returnPath: formData.get('returnPath'),
  });

  if (!validatedFields.success) {
    console.log({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Participant.',
    });
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Participant.',
    };
  }

  // Prepare data for insertion into the database
  const { userId, studyId, isControl, returnPath } = validatedFields.data;

  try {
    await prisma.participants.update({
      where: {
        id,
      },
      data: {
        // name,
        user_id: userId,
        study_id: studyId,
        is_control: isControl === 'true' ? true : false,
      },
    });
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Participant.' };
  }

  revalidatePath(returnPath || '/dashboard/participants');
  redirect(returnPath || '/dashboard/participants');
}

export async function deleteParticipant(id: string) {
  // throw new Error('Failed to Delete Participant');
  try {
    await prisma.participants.delete({
      where: {
        id,
      },
    });

    revalidatePath('/dashboard/participants');

    return { message: 'Deleted Participant.' };
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Delete Participant.' };
  }
}
