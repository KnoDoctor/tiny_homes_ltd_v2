import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/app/ui/main/breadcrumbs';

export const metadata: Metadata = {
  title: 'About Us',
};

const AboutUs = () => {
  return (
    <div className="px-8 py-2">
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
      AboutUs
    </div>
  );
};

export default AboutUs;
