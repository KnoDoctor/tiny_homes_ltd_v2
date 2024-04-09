import { PostField } from '@/app/lib/definitions';
import { generatePostSnippet } from '@/app/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const StandarPost = ({ post }: { post: PostField }) => {
  return (
    <Link href="/read">
      <div className="mb-4 flex h-48 w-full rounded md:flex-row">
        <div className="relative h-48 w-4/12">
          <Image
            src={post?.image_url || '/homes/1.jpg'}
            fill
            style={{ objectFit: 'cover' }}
            alt="Sub-feature post"
          />
        </div>
        <div className="relative h-full w-8/12">
          <div className="flex h-full flex-col justify-center bg-stone-100 px-6 py-4">
            <span className="my-1 hidden text-xs text-green-700 md:block">
              {post.category.name}
            </span>
            <div className="text-md font-semibold text-gray-800 ">
              {post.title}
            </div>
            <div>
              <p className="my-1 block text-xs text-gray-600">
                {post?.user?.name} |{' '}
                {post.date_created.toISOString().split('T')[0]}
              </p>
            </div>
            <p className="block grow p-2 pl-0 pt-1 text-sm text-gray-600">
              {generatePostSnippet(post.content)}...
            </p>
            <p className="block p-2 pl-0 pt-1 text-right text-sm text-gray-600">
              Read more...
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StandarPost;
