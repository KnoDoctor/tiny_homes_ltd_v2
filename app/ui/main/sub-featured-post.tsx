import Image from 'next/image';
import React from 'react';

const SubFeaturedPost = ({ post }: any) => {
  return (
    <div className="mb-4 flex h-24 w-full rounded md:flex-row">
      <div className="relative h-24 w-4/12">
        <Image
          src={`/homes/${post.imageId}.jpg`}
          fill
          style={{ objectFit: 'cover' }}
          alt="Sub-feature post"
        />
      </div>
      <div className="relative h-full w-8/12">
        <div className="h-full bg-stone-100 p-2">
          <span className="hidden text-xs text-green-700 md:block">
            {post.category}
          </span>
          <div className="text-md mb-2 font-semibold text-gray-800 md:mt-0">
            {post.title}
          </div>
          <p className="block p-2 pl-0 pt-1 text-sm text-gray-600 md:hidden">
            Wonder matter now can estate esteem assure fat roused. Am performed
            on existence as discourse is. Pleasure friendly at marriage blessing
            or
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubFeaturedPost;
