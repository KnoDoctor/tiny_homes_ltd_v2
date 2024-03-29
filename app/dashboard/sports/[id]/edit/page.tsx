import Form from '@/app/ui/_sports/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchSportById } from '@/app/lib/data/sports';

import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Sport',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const sport = await fetchSportById(id);

  if (!sport) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sports', href: '/dashboard/sports' },
          {
            label: 'Edit Sport',
            href: `/dashboard/sports/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form sport={sport} />
    </main>
  );
}
