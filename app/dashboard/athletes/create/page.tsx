import Form from '@/app/ui/_athletes/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
import { fetchSports } from '@/app/lib/data/sports';

export const metadata: Metadata = {
  title: 'Create Athlete',
};

export default async function Page() {
  const sports = await fetchSports();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Athletes', href: '/dashboard/athletes' },
          {
            label: 'Create Athlete',
            href: '/dashboard/athletes/create',
            active: true,
          },
        ]}
      />
      <Form sports={sports} />
    </main>
  );
}
