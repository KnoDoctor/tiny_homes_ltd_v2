'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '@/prisma/prismaClientInstance';

export type State = {
  errors?: {
    title?: string[];
    imageUrl?: string[];
    content?: string[];
    date_created?: string[];
    userId?: string[];
    categoryId?: string[];
  };
  message?: string | null;
};

//This sets the zod Schema for the Post Form, it defines the form validation logic for the studie database entity
const PostFormSchema = z.object({
  id: z.string(),
  title: z
    .string({ invalid_type_error: 'Please enter a post title' })
    .min(6, 'The title should be descriptive'),
  imageUrl: z.string({
    invalid_type_error: 'Enter an image url.',
  }),
  content: z.string({
    invalid_type_error: 'Enter some content.',
  }),
  date_created: z.string({
    invalid_type_error: 'Please select a bias.',
  }),
  userId: z.string({
    invalid_type_error: 'Please select a bias.',
  }),
  categoryId: z.string({
    invalid_type_error: 'Please select a bias.',
  }),
});

// Use Zod to update the expected types
const CreatePost = PostFormSchema.omit({ id: true, date_created: true });
export async function createPost(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreatePost.safeParse({
    title: formData.get('title'),
    imageUrl: formData.get('imageUrl'),
    content: formData.get('content'),
    userId: formData.get('userId'),
    categoryId: formData.get('categoryId'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Post.',
    };
  }

  // Prepare data for insertion into the database
  const { title, content, imageUrl, userId, categoryId } = validatedFields.data;

  const date = new Date();

  // Insert data into the database
  try {
    await prisma.posts.create({
      data: {
        title,
        image_url: imageUrl,
        content,
        date_created: date,
        user_id: userId,
        category_id: categoryId,
      },
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Post.',
    };
  }

  // Revalidate the cache for the posts page and redirect the user.
  revalidatePath('/dashboard/posts');
  redirect('/dashboard/posts');
}

// Use Zod to update the expected types
const UpdatePost = PostFormSchema.omit({ id: true, date_created: true });
export async function updatePost(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdatePost.safeParse({
    title: formData.get('title'),
    imageUrl: formData.get('imageUrl'),
    content: formData.get('content'),
    userId: formData.get('userId'),
    categoryId: formData.get('categoryId'),
  });

  if (!validatedFields.success) {
    console.log({
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Response.',
    });
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Post.',
    };
  }

  // Prepare data for insertion into the database
  const { title, content, imageUrl, userId, categoryId } = validatedFields.data;

  try {
    await prisma.posts.update({
      where: {
        id,
      },
      data: {
        title,
        image_url: imageUrl,
        content,
        user_id: userId,
        category_id: categoryId,
      },
    });
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Post.' };
  }

  revalidatePath('/dashboard/posts');
  redirect('/dashboard/posts');
}

export async function deletePost(id: string) {
  // throw new Error('Failed to Delete Post');
  try {
    await prisma.posts.delete({
      where: {
        id,
      },
    });

    revalidatePath('/dashboard/posts');

    return { message: 'Deleted Post.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Post.' };
  }
}
