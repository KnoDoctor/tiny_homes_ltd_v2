'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '@/prisma/prismaClientInstance';
const bcrypt = require('bcrypt');

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

//This sets the zod Schema for the User Form, it defines the form validation logic for the user database entity
const UserFormSchema = z.object({
  id: z.string(),
  name: z
    .string({ invalid_type_error: 'Please enter a name' })
    .min(1, 'Please enter a full name'),
  email: z.string({ invalid_type_error: 'Please enter a email' }).email(),
  password: z
    .string({ invalid_type_error: 'Please enter a password' })
    .min(10, 'Password must be at least 10 characters'),
});

// Use Zod to update the expected types
const CreateUser = UserFormSchema.omit({ id: true });
export async function createUser(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert data into the database
  try {
    await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create User.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

// Use Zod to update the expected types
const UpdateUser = UserFormSchema.omit({ id: true });
export async function updateUser(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { name, email, password } = validatedFields.data;

  try {
    await prisma.users.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

export async function deleteUser(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await prisma.users.delete({
      where: {
        id,
      },
    });

    revalidatePath('/dashboard/users');

    return { message: 'Deleted User.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete User.' };
  }
}
