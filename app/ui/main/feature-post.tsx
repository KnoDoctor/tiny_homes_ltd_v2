import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Button } from '../button';
import Link from 'next/link';
import Image from 'next/image';
import { fetchPosts } from '@/app/lib/data/posts';
import { PostField } from '@/app/lib/definitions';
import { generatePostSnippet } from '@/app/lib/utils';

const FeaturedPost = ({ post }: { post: PostField }) => {
  return (
    <div className="md:w-4/7 relative mb-4 block flex w-full flex-col pr-4 lg:mb-0">
      <div className="relative h-64">
        <Image
          src={post?.image_url || '/homes/2.jpg'}
          alt="hero-image"
          fill
          className="h-64 w-full  object-cover"
        />
      </div>
      <div className="">
        <span className="mt-4 hidden text-xs text-green-700 md:block">
          {post?.category.name || ''}
        </span>
        <h1 className="mb-2 mt-2 text-4xl font-bold leading-tight text-gray-800">
          {post?.title || 'Not Feature Selected'}
        </h1>
        <p className="mb-4 text-gray-600">
          {generatePostSnippet(post?.content) || ''}...
        </p>
        <Link href="/read" className="mt-4">
          <Button className="mt-4 ">
            Read More
            <PaperAirplaneIcon className="ml-4 h-5 w-5 text-gray-50" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedPost;

{
  /* <div className="md:w-4/7 relative mb-4 block flex w-full flex-col p-0 lg:mb-0">
<div className="relative h-64">
  <Image
    src={'/homes/2.jpg'}
    alt="hero-image"
    fill
    className="h-64 w-full  object-cover"
  />
</div>
<div className="">
  <span className="mt-4 hidden text-xs text-green-700 md:block">
    {post.category.name}
  </span>
  <h1 className="mb-2 mt-2 text-4xl font-bold leading-tight text-gray-800">
    {post.title}
  </h1>
  <p className="mb-4 text-gray-600">
    {generatePostSnippet(post.content)}...
  </p>
  <Link href="/read" className="mt-4">
    <Button className="mt-4 ">
      Read More
      <PaperAirplaneIcon className="ml-4 h-5 w-5 text-gray-50" />
    </Button>
  </Link>
</div>
</div> */
}
