import Form from '@/app/ui/_sports/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchSports } from '@/app/lib/data/sports';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Sport',
};

export default async function Page() {
  const sports = await fetchSports();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sports', href: '/dashboard/sports' },
          {
            label: 'Create Sport',
            href: '/dashboard/sports/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
