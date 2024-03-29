'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '@/prisma/prismaClientInstance';

export type State = {
  errors?: {
    name?: string[];
    status?: string[];
    sportId?: string[];
    biasId?: string[];
  };
  message?: string | null;
};

//This sets the zod Schema for the Study Form, it defines the form validation logic for the studie database entity
const StudyFormSchema = z.object({
  id: z.string(),
  name: z
    .string({ invalid_type_error: 'Please enter a study name' })
    .min(6, 'The name should be descriptive'),
  sportId: z.string({
    invalid_type_error: 'Please select a sport.',
  }),
  biasId: z.string({
    invalid_type_error: 'Please select a bias.',
  }),
  status: z.enum(
    ['draft', 'finalized', 'cancelled', 'in_progress', 'complete'],
    {
      invalid_type_error: 'Please select an study status.',
    },
  ),
});

// Use Zod to update the expected types
const CreateStudy = StudyFormSchema.omit({ id: true });
export async function createStudy(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateStudy.safeParse({
    name: formData.get('name'),
    status: formData.get('status'),
    sportId: formData.get('sportId'),
    biasId: formData.get('biasId'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Study.',
    };
  }

  // Prepare data for insertion into the database
  const { name, status, sportId, biasId } = validatedFields.data;

  const date = new Date();

  // Insert data into the database
  try {
    await prisma.studies.create({
      data: {
        name,
        status,
        date,
        sport_id: sportId,
        bias_id: biasId,
      },
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Study.',
    };
  }

  // Revalidate the cache for the studies page and redirect the user.
  revalidatePath('/dashboard/studies');
  redirect('/dashboard/studies');
}

// Use Zod to update the expected types
const UpdateStudy = StudyFormSchema.omit({ id: true });
export async function updateStudy(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateStudy.safeParse({
    name: formData.get('name'),
    status: formData.get('status'),
    sportId: formData.get('sportId'),
    biasId: formData.get('biasId'),
  });

  if (!validatedFields.success) {
    console.log({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Response.',
    });
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Study.',
    };
  }

  // Prepare data for insertion into the database
  const { name, status, sportId, biasId } = validatedFields.data;

  try {
    await prisma.studies.update({
      where: {
        id,
      },
      data: {
        name,
        sport_id: sportId,
        bias_id: biasId,
        status,
      },
    });
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Study.' };
  }

  revalidatePath('/dashboard/studies');
  redirect('/dashboard/studies');
}

export async function deleteStudy(id: string) {
  // throw new Error('Failed to Delete Study');
  try {
    await prisma.studies.delete({
      where: {
        id,
      },
    });

    revalidatePath('/dashboard/studies');

    return { message: 'Deleted Study.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Study.' };
  }
}
