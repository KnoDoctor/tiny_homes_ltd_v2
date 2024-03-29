'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '@/prisma/prismaClientInstance';

export type State = {
  errors?: {
    name?: string[];
    sportId?: string[];
  };
  message?: string | null;
};

//This sets the zod Schema for the Athlete Form, it defines the form validation logic for the studie database entity
const AthleteFormSchema = z.object({
  id: z.string(),
  name: z
    .string({ invalid_type_error: 'Please enter a athlete name' })
    .min(6, 'The name should be descriptive'),
  sportId: z.string({
    invalid_type_error: 'Please select a sport.',
  }),
});

// Use Zod to update the expected types
const CreateAthlete = AthleteFormSchema.omit({ id: true });
export async function createAthlete(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateAthlete.safeParse({
    name: formData.get('name'),
    sportId: formData.get('sportId'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Athlete.',
    };
  }

  // Prepare data for insertion into the database
  const { name, sportId } = validatedFields.data;

  const now = new Date();

  // Insert data into the database
  try {
    await prisma.athletes.create({
      data: {
        name,
        sport_id: sportId,
        date_created: now,
      },
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Athlete.',
    };
  }

  // Revalidate the cache for the athletes page and redirect the user.
  revalidatePath('/dashboard/athletes');
  redirect('/dashboard/athletes');
}

// Use Zod to update the expected types
const UpdateAthlete = AthleteFormSchema.omit({ id: true });
export async function updateAthlete(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateAthlete.safeParse({
    name: formData.get('name'),
    sportId: formData.get('sportId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Athlete.',
    };
  }

  // Prepare data for insertion into the database
  const { name, sportId } = validatedFields.data;

  try {
    await prisma.athletes.update({
      where: {
        id,
      },
      data: {
        name,
        sport_id: sportId,
      },
    });
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Athlete.' };
  }

  revalidatePath('/dashboard/athletes');
  redirect('/dashboard/athletes');
}

export async function deleteAthlete(id: string) {
  // throw new Error('Failed to Delete Athlete');
  try {
    await prisma.athletes.delete({
      where: {
        id,
      },
    });

    revalidatePath('/dashboard/athletes');

    return { message: 'Deleted Athlete.' };
  } catch (error) {
    console.log(error);

    return { message: 'Database Error: Failed to Delete Athlete.' };
  }
}
