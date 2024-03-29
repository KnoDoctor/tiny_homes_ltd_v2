import Form from '@/app/ui/_studies/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchStudyById } from '@/app/lib/data/studies';

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchSports } from '@/app/lib/data/sports';
import { fetchBiases } from '@/app/lib/data/biases';
import { fetchParticipants } from '@/app/lib/data/participants';

export const metadata: Metadata = {
  title: 'Edit Study',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const [study, sports, biases, participants] = await Promise.all([
    fetchStudyById(id),
    fetchSports(),
    fetchBiases(),
    fetchParticipants()
  ]);

  if (!study) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Studies', href: '/dashboard/studies' },
          {
            label: 'Edit Study',
            href: `/dashboard/studies/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form study={study} sports={sports} biases={biases} participants={participants} />
    </main>
  );
}
