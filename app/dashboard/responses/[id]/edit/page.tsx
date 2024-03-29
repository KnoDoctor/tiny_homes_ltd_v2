import Form from '@/app/ui/_responses/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchResponseById } from '@/app/lib/data/responses';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchParticipants } from '@/app/lib/data/participants';
import { fetchStudies } from '@/app/lib/data/studies';
import { fetchAthletes } from '@/app/lib/data/athletes';

export const metadata: Metadata = {
  title: 'Edit Response',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const [response, participants, athletes, studies] = await Promise.all([
    fetchResponseById(id),
    fetchParticipants(),
    fetchAthletes(),
    fetchStudies(),
  ]);

  if (!response) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Responses', href: '/dashboard/responses' },
          {
            label: 'Edit Response',
            href: `/dashboard/responses/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form
        response={response}
        participants={participants}
        studies={studies}
        athletes={athletes}
      />
    </main>
  );
}
