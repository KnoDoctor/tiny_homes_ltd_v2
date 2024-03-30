import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'About Us',
};

const AboutUs = () => {
  return (
    <div className="p-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/' },
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
