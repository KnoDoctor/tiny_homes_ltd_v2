import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Tiny Homes',
};
const TinyHomes = () => {
  return (
    <div className="p-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/' },
          {
            label: 'Tiny Homes',
            href: '/tiny-homes',
            active: true,
          },
        ]}
      />
      TinyHomes
    </div>
  );
};

export default TinyHomes;
