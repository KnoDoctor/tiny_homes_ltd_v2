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

//This sets the zod Schema for the Category Form, it defines the form validation logic for the studie database entity
const CategoryFormSchema = z.object({
  id: z.string(),
  name: z
    .string({ invalid_type_error: 'Please enter a category name' })
    .min(2, 'The name should be descriptive'),
});

// Use Zod to update the expected types
const CreateCategory = CategoryFormSchema.omit({ id: true });
export async function createCategory(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateCategory.safeParse({
    name: formData.get('name'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Category.',
    };
  }

  // Prepare data for insertion into the database
  const { name } = validatedFields.data;

  // Insert data into the database
  try {
    await prisma.categories.create({
      data: {
        name,
      },
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Category.',
    };
  }

  // Revalidate the cache for the categories page and redirect the user.
  revalidatePath('/dashboard/categories');
  redirect('/dashboard/categories');
}

// Use Zod to update the expected types
const UpdateCategory = CategoryFormSchema.omit({ id: true });
export async function updateCategory(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateCategory.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Category.',
    };
  }

  // Prepare data for insertion into the database
  const { name } = validatedFields.data;

  try {
    await prisma.categories.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Category.' };
  }

  revalidatePath('/dashboard/categories');
  redirect('/dashboard/categories');
}

export async function deleteCategory(id: string) {
  // throw new Error('Failed to Delete Category');
  try {
    await prisma.categories.delete({
      where: {
        id,
      },
    });

    revalidatePath('/dashboard/categories');

    return { message: 'Deleted Category.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Category.' };
  }
}
