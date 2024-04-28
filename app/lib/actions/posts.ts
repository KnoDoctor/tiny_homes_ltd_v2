'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '@/prisma/prismaClientInstance';

export type State = {
  errors?: {
    title?: string[];
    slug?: string[];
    imageUrl?: string[];
    isFeature?: string[];
    isSubFeature?: string[];
    isFeaturedCarousel?: string[];
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
  slug: z.string({
    invalid_type_error: 'Enter a post slug.',
  }),
  imageUrl: z.string({
    invalid_type_error: 'Enter an image url.',
  }),
  isFeature: z.boolean(),
  isSubFeature: z.boolean(),
  isFeaturedCarousel: z.boolean(),
  content: z.string({
    invalid_type_error: 'Enter some content.',
  }),
  date_created: z.string({
    invalid_type_error: 'Please select a bias.',
  }),
  userId: z.string({
    invalid_type_error: 'Please select a user.',
  }),
  categoryId: z.string({
    invalid_type_error: 'Please select a category.',
  }),
});

// Use Zod to update the expected types
const CreatePost = PostFormSchema.omit({ id: true, date_created: true });

export async function createPost(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreatePost.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    imageUrl: formData.get('imageUrl'),
    isFeature: formData.get('isFeature') === 'on',
    isSubFeature: formData.get('isSubFeature') === 'on',
    isFeaturedCarousel: formData.get('isFeaturedCarousel') === 'on',
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
  const {
    title,
    slug,
    content,
    imageUrl,
    isFeature,
    isSubFeature,
    isFeaturedCarousel,
    userId,
    categoryId,
  } = validatedFields.data;

  const date = new Date();

  // Insert data into the database
  try {
    await prisma.posts.create({
      data: {
        title,
        slug,
        image_url: imageUrl,
        is_feature: isFeature,
        is_sub_feature: isSubFeature,
        is_featured_carousel: isFeaturedCarousel,
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
    slug: formData.get('slug'),
    imageUrl: formData.get('imageUrl'),
    isFeature: formData.get('isFeature') === 'on',
    isSubFeature: formData.get('isSubFeature') === 'on',
    isFeaturedCarousel: formData.get('isFeaturedCarousel') === 'on',
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
  const {
    title,
    slug,
    content,
    imageUrl,
    isFeature,
    isSubFeature,
    isFeaturedCarousel,
    userId,
    categoryId,
  } = validatedFields.data;

  try {
    await prisma.posts.update({
      where: {
        id,
      },
      data: {
        title,
        slug,
        image_url: imageUrl,
        is_feature: isFeature,
        is_sub_feature: isSubFeature,
        is_featured_carousel: isFeaturedCarousel,
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
