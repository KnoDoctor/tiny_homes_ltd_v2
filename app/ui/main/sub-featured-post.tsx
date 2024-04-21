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
        <div className="relative w-4/12">
          <Image
            src={post?.image_url || '/homes/1.jpg'}
            fill
            style={{ objectFit: 'cover' }}
            alt="Sub-feature post"
          />
        </div>
        <div className="relative h-full w-8/12">
          <div className="h-full bg-stone-100 px-6 py-4">
            <span
              className={clsx(
                'hidden text-sm font-light text-green-700 md:block',
                `${roboto.className}`,
              )}
            >
              {post.category.name}
            </span>
            <div>
              <span
                className={clsx(
                  'mb-2 mt-2 text-base font-light text-gray-800',
                  `${roboto.className}`,
                )}
              >
                {post.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SubFeaturedPost;
