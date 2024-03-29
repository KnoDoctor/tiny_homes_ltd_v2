'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '@/prisma/prismaClientInstance';

export type State = {
  errors?: {
    name?: string[];
    biasId?: string[];
    athleteId?: string[];
    returnPath?: string[];
  };
  message?: string | null;
};

//This sets the zod Schema for the BiasStatement Form, it defines the form validation logic for the studie database entity
const BiasStatementFormSchema = z.object({
  id: z.string(),
  name: z
    .string({ invalid_type_error: 'Please enter a bias statement name' })
    .min(6, 'The name should be descriptive'),
  biasId: z.string({
    invalid_type_error: 'Please select a bias.',
  }),
  athleteId: z.string({
    invalid_type_error: 'Please select a athlete.',
  }),
  returnPath: z.optional(z.string()),
});

// Use Zod to update the expected types
const CreateBiasStatement = BiasStatementFormSchema.omit({ id: true });
export async function createBiasStatement(
  prevState: State,
  formData: FormData,
) {
  // Validate form using Zod
  const validatedFields = CreateBiasStatement.safeParse({
    name: formData.get('name'),
    biasId: formData.get('biasId'),
    athleteId: formData.get('athleteId'),
    returnPath: formData.get('returnPath'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create BiasStatement.',
    };
  }

  // Prepare data for insertion into the database
  const { name, biasId, athleteId, returnPath } = validatedFields.data;

  const now = new Date();

  // Insert data into the database
  try {
    await prisma.bias_statements.create({
      data: {
        name,
        bias_id: biasId,
        athlete_id: athleteId,
        date: now,
      },
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create BiasStatement.',
    };
  }

  // Revalidate the cache for the bias_statements page and redirect the user.
  revalidatePath(returnPath || '/dashboard/bias-statements');
  redirect(returnPath || '/dashboard/bias-statements');
}

// Use Zod to update the expected types
const UpdateBiasStatement = BiasStatementFormSchema.omit({ id: true });
export async function updateBiasStatement(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateBiasStatement.safeParse({
    name: formData.get('name'),
    biasId: formData.get('biasId'),
    athleteId: formData.get('athleteId'),
    returnPath: formData.get('returnPath'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update BiasStatement.',
    };
  }

  // Prepare data for insertion into the database
  const { name, biasId, athleteId, returnPath } = validatedFields.data;

  try {
    await prisma.bias_statements.update({
      where: {
        id,
      },
      data: {
        name,
        bias_id: biasId,
        athlete_id: athleteId,
      },
    });
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update BiasStatement.' };
  }

  revalidatePath(returnPath || '/dashboard/bias-statements');
  redirect(returnPath || '/dashboard/bias-statements');
}

export async function deleteBiasStatement(id: string) {
  // throw new Error('Failed to Delete BiasStatement');
  try {
    await prisma.bias_statements.delete({
      where: {
        id,
      },
    });

    revalidatePath('/dashboard/bias-statements');

    return { message: 'Deleted BiasStatement.' };
  } catch (error) {
    console.log(error);

    return { message: 'Database Error: Failed to Delete BiasStatement.' };
  }
}
