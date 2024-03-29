import Form from '@/app/ui/_studies/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchStudies } from '@/app/lib/data/studies';
import { Metadata } from 'next';
import { fetchSports } from '@/app/lib/data/sports';
import { fetchBiases } from '@/app/lib/data/biases';

export const metadata: Metadata = {
  title: 'Create Study',
};

export default async function Page() {
  const sports = await fetchSports();
  const biases = await fetchBiases();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Studies', href: '/dashboard/studies' },
          {
            label: 'Create Study',
            href: '/dashboard/studies/create',
            active: true,
          },
        ]}
      />
      <Form sports={sports} biases={biases} />
    </main>
  );
}
