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

//This sets the zod Schema for the Bias Form, it defines the form validation logic for the studie database entity
const BiasFormSchema = z.object({
  id: z.string(),
  name: z
    .string({ invalid_type_error: 'Please enter a bias name' })
    .min(2, 'The name should be descriptive'),
});

// Use Zod to update the expected types
const CreateBias = BiasFormSchema.omit({ id: true });
export async function createBias(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateBias.safeParse({
    name: formData.get('name'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Bias.',
    };
  }

  // Prepare data for insertion into the database
  const { name } = validatedFields.data;

  const date = new Date();

  // Insert data into the database
  try {
    await prisma.biases.create({
      data: {
        name,
        date,
      },
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Bias.',
    };
  }

  // Revalidate the cache for the biases page and redirect the user.
  revalidatePath('/dashboard/biases');
  redirect('/dashboard/biases');
}

// Use Zod to update the expected types
const UpdateBias = BiasFormSchema.omit({ id: true });
export async function updateBias(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateBias.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Bias.',
    };
  }

  // Prepare data for insertion into the database
  const { name } = validatedFields.data;

  try {
    await prisma.biases.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Bias.' };
  }

  revalidatePath('/dashboard/biases');
  redirect('/dashboard/biases');
}

export async function deleteBias(id: string) {
  // throw new Error('Failed to Delete Bias');
  try {
    await prisma.biases.delete({
      where: {
        id,
      },
    });

    revalidatePath('/dashboard/biases');

    return { message: 'Deleted Bias.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Bias.' };
  }
}
