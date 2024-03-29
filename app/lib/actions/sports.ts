'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '@/prisma/prismaClientInstance';

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

//This sets the zod Schema for the Sport Form, it defines the form validation logic for the studie database entity
const SportFormSchema = z.object({
  id: z.string(),
  name: z
    .string({ invalid_type_error: 'Please enter a sport name' })
    .min(2, 'The name should be descriptive'),
});

// Use Zod to update the expected types
const CreateSport = SportFormSchema.omit({ id: true });
export async function createSport(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateSport.safeParse({
    name: formData.get('name'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Sport.',
    };
  }

  // Prepare data for insertion into the database
  const { name } = validatedFields.data;

  const date = new Date();

  // Insert data into the database
  try {
    await prisma.sports.create({
      data: {
        name,
        date,
      },
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Sport.',
    };
  }

  // Revalidate the cache for the sports page and redirect the user.
  revalidatePath('/dashboard/sports');
  redirect('/dashboard/sports');
}

// Use Zod to update the expected types
const UpdateSport = SportFormSchema.omit({ id: true });
export async function updateSport(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateSport.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Sport.',
    };
  }

  // Prepare data for insertion into the database
  const { name } = validatedFields.data;

  try {
    await prisma.sports.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Sport.' };
  }

  revalidatePath('/dashboard/sports');
  redirect('/dashboard/sports');
}

export async function deleteSport(id: string) {
  // throw new Error('Failed to Delete Sport');
  try {
    await prisma.sports.delete({
      where: {
        id,
      },
    });

    revalidatePath('/dashboard/sports');

    return { message: 'Deleted Sport.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Sport.' };
  }
}
