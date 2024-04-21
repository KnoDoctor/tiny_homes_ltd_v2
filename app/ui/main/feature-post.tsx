import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { PostField } from '@/app/lib/definitions';
import { generatePostSnippet } from '@/app/lib/utils';
import clsx from 'clsx';
import { anticDidone, roboto } from '../fonts';

const FeaturedPost = ({ post }: { post: PostField }) => {
  return (
    <div className="md:w-4/7 relative mb-4 block flex w-full flex-col pr-4 lg:mb-0">
      <Link href={`/${post.id}`}>
        <div className="relative h-64">
          <Image
            src={post?.image_url || '/homes/2.jpg'}
            alt="hero-image"
            fill
            className="h-64 w-full  object-cover"
          />
        </div>
        <div>
          <span
            className={clsx(
              'mt-4 hidden text-base font-light text-green-700 md:block',
              `${roboto.className}`,
            )}
          >
            {post?.category.name || ''}
          </span>
          <h1
            className={clsx(
              'mb-2 mt-2 text-4xl font-bold leading-tight text-gray-800',
              `${anticDidone.className}`,
            )}
          >
            {post?.title || 'Not Feature Selected'}
          </h1>
          <p
            className={clsx(
              'hidden text-base font-light text-gray-600 md:block',
              `${roboto.className}`,
            )}
          >
            {post?.user?.name} | {post.date_created.toISOString().split('T')[0]}
          </p>
          <p
            className={clsx(
              'mt-4 hidden text-base font-light text-gray-600 md:block',
              `${roboto.className}`,
            )}
          >
            {generatePostSnippet(post?.content) || ''}...
          </p>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedPost;
