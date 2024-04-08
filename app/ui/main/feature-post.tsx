import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Button } from '../button';
import Link from 'next/link';
import Image from 'next/image';

const FeaturedPost = () => {
  return (
    <div className="md:w-4/7 relative mb-4 block flex w-full flex-col p-0 lg:mb-0">
      <div className="relative h-64">
        <Image
          src="/homes/6.jpg"
          alt="hero-image"
          fill
          className="h-64 w-full  object-cover"
        />
      </div>
      <div className="">
        <span className="mt-4 hidden text-xs text-green-700 md:block">
          Design
        </span>
        <h1 className="mb-2 mt-2 text-4xl font-bold leading-tight text-gray-800">
          The Litchfield container cabin blends nature with minimalist living in
          Australia
        </h1>
        <p className="mb-4 text-gray-600">
          Get immersed in the rugged beauty of our Northern bushland, from the
          luxury and comfort of this two story (dressed up) shipping container.
        </p>
        <Link href="/login" className="mt-4">
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
