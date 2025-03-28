import { PostField } from '@/app/lib/definitions';
import { generatePostSnippet, generatePostUrl } from '@/app/lib/utils';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { anticDidone, roboto } from '../fonts';

const StandarPost = ({ post }: { post: PostField }) => {
  return (
    <Link href={generatePostUrl(post.slug, post.date_created)}>
      <div className="mb-4 flex w-full rounded md:flex-row">
        <div className="relative  w-4/12">
          <Image
            src={post?.image_url || '/homes/1.jpg'}
            fill
            style={{ objectFit: 'cover' }}
            alt="Sub-feature post"
          />
        </div>
        <div className="relative h-full w-8/12">
          <div className="flex h-full flex-col justify-center bg-stone-100 px-6 py-4">
            <span
              className={clsx(
                'mb-2 hidden text-sm font-light text-green-700 md:block',
                `${roboto.className}`,
              )}
            >
              {post.category.name}
            </span>
            <div
              className={clsx(
                ' text-3xl font-bold leading-tight text-gray-800',
                `${roboto.className}`,
              )}
            >
              {post.title}
            </div>
            <div>
              <p
                className={clsx(
                  'mt-2 hidden text-sm font-light text-gray-600 md:block',
                  `${roboto.className}`,
                )}
              >
                {post?.user?.name} |{' '}
                {post.date_created.toISOString().split('T')[0]}
              </p>
            </div>
            <p
              className={clsx(
                'mt-4 hidden grow text-base font-light text-gray-600 md:block',
                `${roboto.className}`,
              )}
            >
              {generatePostSnippet(post.content)}...
            </p>
            <p
              // className="block p-2 pl-0 pt-1 text-right text-sm text-gray-600"
              className={clsx(
                'mt-4 block hidden p-2 pl-0 pt-1 text-right text-base font-light text-gray-600 md:block',
                `${roboto.className}`,
              )}
            >
              Read more...
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StandarPost;
