import { PostField } from '@/app/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SubFeaturedPost = ({ post }: { post: PostField }) => {
  return (
    <Link href={`/${post.id}`}>
      <div className="mb-4 flex h-24 w-full rounded md:flex-row">
        <div className="relative h-24 w-4/12">
          <Image
            src={post?.image_url || '/homes/1.jpg'}
            fill
            style={{ objectFit: 'cover' }}
            alt="Sub-feature post"
          />
        </div>
        <div className="relative h-full w-8/12">
          <div className="h-full bg-stone-100 p-2">
            <span className="hidden text-xs text-green-700 md:block">
              {post.category.name}
            </span>
            <div className="text-sm font-semibold text-gray-800">
              {post.title}
            </div>
            <p className="block p-2 pl-0 pt-1 text-sm text-gray-600 md:hidden">
              Wonder matter now can estate esteem assure fat roused. Am
              performed on existence as discourse is. Pleasure friendly at
              marriage blessing or
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SubFeaturedPost;
