import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/app/ui/main/breadcrumbs';
import Image from 'next/image';
import clsx from 'clsx';
import { lusitana, lato } from '@/app/ui/fonts';
import Link from 'next/link';
import Sidebar from '@/app/ui/main/sidebar';
export const metadata: Metadata = {
  title: 'About Us',
};

const AboutUs = () => {
  return (
    <main className="py-2 pl-8">
      <Breadcrumbs
        breadcrumbs={[
          // { label: 'Home', href: '/' },
          {
            label: 'About Us',
            href: '/about-us',
            active: true,
          },
        ]}
      />
      <div className="flex">
        <div className="flex w-9/12 justify-center">
          <div className="xl:w-full 2xl:w-10/12">
            <h2
              className={clsx(
                lusitana.className,
                'mt-4 flex text-xl md:text-3xl',
              )}
            >
              About Us
            </h2>
            <p className={clsx(lato.className, 'text-md mt-4 flex md:text-lg')}>
              Tiny Homes LTD. stands as a beacon for those who share a profound
              love and passion for the minimalist and sustainable lifestyle that
              tiny homes offer. It&apos;s a unique platform where aficionados of
              compact living can gather to discover the latest news,
              innovations, and trends that are shaping the tiny home industry.
              With a commitment to delivering high-quality content, Tiny Homes
              LTD. aims to foster a vibrant community where ideas and
              inspirations flourish, making it a go-to destination for anyone
              looking to embrace the tiny home movement.
            </p>
            <div className="relative mt-4 h-96 w-full">
              <Image
                src="/homes/9.jpg"
                fill
                alt="Feature Post 2"
                objectFit="cover"
              />
            </div>
            <p className={clsx(lato.className, 'text-md mt-4 flex md:text-lg')}>
              Despite its current modest size, Tiny Homes LTD. is driven by a
              vision that extends far beyond just being an information portal.
              The founders and the team behind the platform are dedicated to
              curating and creating content that resonates with the tiny home
              community. From insightful articles and blog posts to captivating
              videos and interviews, every piece of content is designed to
              engage, inform, and inspire those who dream of living a more
              intentional, less cluttered life.
            </p>
            <p className={clsx(lato.className, 'text-md mt-4 flex md:text-lg')}>
              In the near future, Tiny Homes LTD. is poised to expand its
              offerings by introducing an array of designs, products, and
              personal stories directly from individuals who have made the leap
              into tiny home living. This initiative aims to bridge the gap
              between aspiration and reality, providing tangible examples and
              practical advice for those looking to make tiny living a part of
              their lives. By showcasing real-life experiences and the diverse
              possibilities within the tiny home lifestyle, the platform seeks
              to demystify the process and encourage more people to explore this
              sustainable way of living.
            </p>
            <div className="relative mt-4 h-96 w-full">
              <Image
                src="/homes/10.jpg"
                fill
                alt="Feature Post 2"
                objectFit="cover"
              />
            </div>
            <p className={clsx(lato.className, 'text-md mt-4 flex md:text-lg')}>
              As Tiny Homes LTD. continues to grow and evolve, it remains
              steadfast in its mission to be at the forefront of the tiny home
              revolution. By offering a blend of content that ranges from the
              latest industry news to deeply personal stories of tiny home
              living, it aspires to be more than just a resource; it aims to be
              a community and a catalyst for change. For anyone dreaming of
              downsizing their life and embracing a philosophy of minimalism and
              sustainability, Tiny Homes LTD. is the ultimate destination to
              embark on this transformative journey.
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

export default AboutUs;
