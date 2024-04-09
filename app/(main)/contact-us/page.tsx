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
    <main className="py-2">
      <Breadcrumbs
        breadcrumbs={[
          // { label: 'Home', href: '/' },
          {
            label: 'Contact Us',
            href: '/contact-us',
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
