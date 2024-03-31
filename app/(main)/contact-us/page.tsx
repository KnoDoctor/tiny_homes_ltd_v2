import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/app/ui/main/breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact Us',
};
const ContactUs = () => {
  return (
    <div className="px-8 py-2">
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
      AboutUs
    </div>
  );
};

export default ContactUs;
