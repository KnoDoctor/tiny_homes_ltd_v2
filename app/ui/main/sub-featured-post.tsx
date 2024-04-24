import { PostField } from '@/app/lib/definitions';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { anticDidone, roboto } from '../fonts';

const SubFeaturedPost = ({ post }: { post: PostField }) => {
  return (
    <Link href={`/${post.id}`}>
      <div className=" mb-4 flex w-full rounded md:flex-row">
        <div className="relative w-3/12">
          <Image
            src={post?.image_url || '/homes/1.jpg'}
            fill
            style={{ objectFit: 'cover' }}
            alt="Sub-feature post"
          />
        </div>
        <div className="relative h-full w-9/12">
          <div className="h-full bg-stone-100 px-4 py-2">
            <span
              className={clsx(
                'mb-1 hidden text-xs font-light text-green-700 md:block',
                `${roboto.className}`,
              )}
            >
              {post.category.name}
            </span>
            <div>
              <span
                className={clsx(
                  'text-base font-bold text-gray-800',
                  `${roboto.className}`,
                )}
              >
                {post.title}
              </span>
            </div>
            <p
              className={clsx(
                'mt-1 hidden text-xs font-light text-gray-600 md:block',
                `${roboto.className}`,
              )}
            >
              {post?.user?.name} |{' '}
              {post.date_created.toISOString().split('T')[0]}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SubFeaturedPost;
