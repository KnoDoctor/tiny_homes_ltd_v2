import Form from '@/app/ui/_athletes/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchAthleteById } from '@/app/lib/data/athletes';

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchSports } from '@/app/lib/data/sports';
import { fetchBiasStatements } from '@/app/lib/data/bias_statements';

export const metadata: Metadata = {
  title: 'Edit Athlete',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const [athlete, sports, bias_statements] = await Promise.all([
    fetchAthleteById(id),
    fetchSports(),
    fetchBiasStatements(),
  ]);

  if (!athlete) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Athletes', href: '/dashboard/athletes' },
          {
            label: 'Edit Athlete',
            href: `/dashboard/athletes/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form
        athlete={athlete}
        sports={sports}
        bias_statements={bias_statements}
      />
    </main>
  );
}
