import Link from 'next/link';
import React from 'react';
import { anticDidone, lusitana, roboto } from '../fonts';
import clsx from 'clsx';
import { fetchPosts } from '@/app/lib/data/posts';
import { PostField } from '@/app/lib/definitions';

const Sidebar = async () => {
  const posts = await fetchPosts();

  return (
    <div className="hidden w-4/12 lg:block 2xl:w-3/12">
      <div className="h-full w-full bg-stone-100 px-8 py-8 ">
        <div className="w-full ">
          <h2
            className={clsx(
              roboto.className,
              'my-4 flex text-xl font-bold md:text-3xl',
            )}
          >
            Recent posts
          </h2>
          <hr className="my-4 h-px border-0 bg-stone-300"></hr>
          <div className="divide-y divide-stone-200">
            {posts
              .filter((post: PostField) => post.is_sub_feature === true)
              .map((post: PostField) => {
                return (
                  <div className="p-4" key={post.id}>
                    <Link href={`/${post.id}`}>
                      <p
                        className={clsx(
                          roboto.className,
                          'flex text-base font-light',
                        )}
                      >
                        {post.title}
                      </p>
                    </Link>
                  </div>
                );
              })}
          </div>
          <h2
            className={clsx(
              roboto.className,
              'my-4 flex text-xl font-bold md:text-3xl',
            )}
          >
            Recent comments
          </h2>
          <hr className="my-4 h-px border-0 bg-stone-300"></hr>
          <div className="divide-y divide-stone-200">
            {posts
              .filter((post: PostField) => post.is_sub_feature === true)
              .map((post: PostField) => {
                return (
                  <div className="p-4" key={post.id}>
                    <Link href={`/${post.id}`}>
                      <p
                        className={clsx(
                          roboto.className,
                          'flex text-base font-light',
                        )}
                      >
                        {post.title}
                      </p>
                    </Link>
                  </div>
                );
              })}
          </div>
          <h2
            className={clsx(
              roboto.className,
              'my-4 flex text-xl font-bold md:text-3xl',
            )}
          >
            Archieve
          </h2>
          <hr className="my-4 h-px border-0 bg-stone-300"></hr>
          <div className="divide-y divide-stone-200">
            {posts
              .filter((post: PostField) => post.is_sub_feature === true)
              .map((post: PostField) => {
                return (
                  <div className="p-4" key={post.id}>
                    <Link href={`/${post.id}`}>
                      <p
                        className={clsx(
                          roboto.className,
                          'flex text-base font-light',
                        )}
                      >
                        {post.title}
                      </p>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
