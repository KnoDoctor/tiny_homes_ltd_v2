import React from 'react';

import { MDXRemote } from 'next-mdx-remote/rsc';
import Breadcrumbs from '@/app/ui/main/breadcrumbs';
import Sidebar from '@/app/ui/main/sidebar';
import clsx from 'clsx';
import { anticDidone, lusitana, roboto } from '@/app/ui/fonts';
import { useRouter } from 'next/navigation';
import { fetchPostById } from '@/app/lib/data/posts';
import Image from 'next/image';
import PhotoGallery from '@/app/ui/main/photo-gallery';

export default async function Blog({
  params,
}: {
  params: { blogUrl: string[] };
}) {
  const postId = params?.blogUrl?.[0];

  const post = await fetchPostById(postId);

  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  // const markdown = 'Some **mdx** text, with a component';

  // const res = await fetch('https://...')
  // const markdown = await res.text()
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          // { label: 'Home', href: '/' },
          {
            label: post?.title || '',
            href: post?.id || '/',
            active: true,
          },
        ]}
      />
      <div className="flex">
        <div className="flex w-full justify-center px-8 lg:w-8/12 2xl:w-9/12">
          <div className="w-full 2xl:w-10/12">
            <div className="relative h-96 w-full">
              <Image
                src={post?.image_url || '/homes/1.jpg'}
                fill
                alt="Feature Post 2"
                objectFit="cover"
              />
            </div>
            <div>
              <span
                className={clsx(
                  'mt-4 hidden text-xl font-light text-green-700 md:block',
                  `${roboto.className}`,
                )}
              >
                {post?.category.name || ''}
              </span>
              <h1
                className={clsx(
                  'mb-2 mt-2 text-6xl font-bold leading-tight text-gray-800',
                  `${roboto.className}`,
                )}
              >
                {post?.title || 'Not Feature Selected'}
              </h1>
              <p
                // className="my-1 block text-xs text-gray-600"
                className={clsx(
                  'mt-4 hidden text-xl font-light text-gray-600 md:block',
                  `${roboto.className}`,
                )}
              >
                {post?.user?.name} |{' '}
                {post?.date_created.toISOString().split('T')[0]}
              </p>
            </div>
            <div className="mdxRemoteWrapper mt-4">
              <MDXRemote source={post?.content || 'No Content'} />
            </div>
            <PhotoGallery postId={postId} />
          </div>
        </div>
        <Sidebar />
      </div>
      <div className="flex">
        <div className="h-4 w-full bg-blue-500"></div>
      </div>
    </main>
  );
}
