'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '@/prisma/prismaClientInstance';

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

//This sets the zod Schema for the Customer Form, it defines the form validation logic for the customer database entity
const CustomerFormSchema = z.object({
  id: z.string(),
  name: z
    .string({ invalid_type_error: 'Please enter a name' })
    .min(1, 'Please enter a full name'),
  email: z.string({ invalid_type_error: 'Please enter a email' }).email(),
  image_url: z
    .string({ invalid_type_error: 'Please enter a image_url' })
    .regex(
      new RegExp('^/customers/[a-z-]+.png$'),
      `Invalid path. Please use the format '/customers/name.png' with lowercase letters and hyphens only.`,
    ),
});

// Use Zod to update the expected types
const CreateCustomer = CustomerFormSchema.omit({ id: true });
export async function createCustomer(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { name, email, image_url } = validatedFields.data;

  // Insert data into the database
  try {
    await prisma.customers.create({
      data: {
        name,
        email,
        image_url,
      },
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Customer.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

// Use Zod to update the expected types
const UpdateCustomer = CustomerFormSchema.omit({ id: true });
export async function updateCustomer(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { name, email, image_url } = validatedFields.data;

  try {
    await prisma.customers.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        image_url,
      },
    });
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await prisma.customers.delete({
      where: {
        id,
      },
    });

    revalidatePath('/dashboard/customers');

    return { message: 'Deleted Customer.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Customer.' };
  }
}
