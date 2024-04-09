import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/app/ui/main/breadcrumbs';
import Image from 'next/image';
import clsx from 'clsx';
import { lusitana, lato } from '@/app/ui/fonts';
import Link from 'next/link';
import Sidebar from '@/app/ui/main/sidebar';

export const metadata: Metadata = {
  title: 'Tiny Homes',
};
const TinyHomes = () => {
  return (
    <main className="py-2">
      <Breadcrumbs
        breadcrumbs={[
          // { label: 'Home', href: '/' },
          {
            label: 'Tiny Homes',
            href: '/tiny-homes',
            active: true,
          },
        ]}
      />
      <div className="flex">
        <div className="flex w-full justify-center px-8 lg:w-8/12 2xl:w-9/12">
          <div className="w-full 2xl:w-10/12">
            <h2
              className={clsx(lusitana.className, 'flex text-xl md:text-3xl')}
            >
              What are tiny homes?
            </h2>
            <p className={clsx(lato.className, 'text-md mt-4 flex md:text-lg')}>
              Imagine a home that lets you live rent free, mortgage free and
              with nearly zero utility costs. Imagine owning a home that&apos;s
              capable of generating its own electricity and capturing its own
              water. Now imagine you could build this home yourself without
              going into debt for the next 30 or more years. Sound appealing?
            </p>
            <div className="relative mt-4 h-96 w-full">
              <Image
                src="/homes/8.jpg"
                fill
                alt="Feature Post 2"
                objectFit="cover"
              />
            </div>
            <p className={clsx(lato.className, 'text-md mt-4 flex md:text-lg')}>
              Rapidly growing in popularity over the last twenty years, tiny
              homes are starting to pop up all around the world. As more people
              begin to downsize their lives and explore minimalistic lifestyles,
              these small scale houses are proving to be the perfect solution.
              While the structures themselves often measure less than 300 square
              feet, the dreams of the owners are far less petite.
            </p>
            <div className="relative mt-4 h-96 w-full">
              <Image
                src="/homes/3.jpg"
                fill
                alt="Feature Post 2"
                objectFit="cover"
              />
            </div>
            <p className={clsx(lato.className, 'text-md mt-4 flex md:text-lg')}>
              What is perhaps even more appealing than the financial and
              economic benefits of owning a tiny home, is the positive
              environmental impact the lifestyle provides. Living in a tiny
              house means we use fewer resources to live, and encourages us to
              be more conscientious about the products we consume. They move us
              towards a more simplistic way of life that opens a world of
              possibility for a more sustainable future.
            </p>
            <p className={clsx(lato.className, 'text-md mt-4 flex md:text-lg')}>
              A typical tiny home contains all the amenities one would expect in
              a modern home. They offer living areas, a sleeping loft, a kitchen
              and complete bathroom. A vast number of tiny houses are also
              constructed on top of a trailer meaning they be easily moved from
              one location to another. This mobile nature has in many ways
              revolutionized home ownership, as it allows people to own their
              home, without needing to own the land that it sits on.
            </p>
            <div className="relative mt-4 h-96 w-full">
              <Image
                src="/homes/7.jpg"
                fill
                alt="Feature Post 2"
                objectFit="cover"
              />
            </div>
            <p className={clsx(lato.className, 'text-md mt-4 flex md:text-lg')}>
              With all that said, the tiny home movement isn’t necessarily about
              sacrifice; it’s about combining thoughtful and innovative design
              with a simpler yet fuller life. A life centered around connecting
              with family, friends, and the nature around them. If any of this
              sounds appealing the tiny home lifestyle could be right for you.
            </p>
            <p
              className={clsx(
                lato.className,
                'text-md mb-12 mt-4 flex md:text-lg',
              )}
            >
              <i>
                Interested in learning more? Be sure to check out our blog and
                if you haven’t already check us out on social media by following
                the links below.
              </i>
            </p>
          </div>
        </div>
        <Sidebar />
      </div>
      <div className="flex">
        <div className="h-4 w-full bg-blue-500"></div>
      </div>
    </main>
  );
};

export default TinyHomes;
