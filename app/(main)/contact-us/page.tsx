import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/app/ui/main/breadcrumbs';
import Image from 'next/image';
import clsx from 'clsx';
import { lusitana, lato } from '@/app/ui/fonts';
import Link from 'next/link';
import Sidebar from '@/app/ui/main/sidebar';

export const metadata: Metadata = {
  title: 'Contact Us',
};
const ContactUs = () => {
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
              className={clsx(lusitana.className, 'flex text-xl md:text-3xl')}
            >
              Leave us a message.
            </h2>
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

export default ContactUs;
