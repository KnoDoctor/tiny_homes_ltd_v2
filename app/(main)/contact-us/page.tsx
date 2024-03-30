import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact Us',
};
const ContactUs = () => {
  return (
    <div className="p-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/' },
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
