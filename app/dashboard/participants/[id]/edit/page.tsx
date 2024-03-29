import Form from '@/app/ui/_participants/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchParticipantById } from '@/app/lib/data/participants';

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchSports } from '@/app/lib/data/sports';
import { fetchStudies } from '@/app/lib/data/studies';
import { fetchUsers } from '@/app/lib/data/users';

export const metadata: Metadata = {
  title: 'Edit Participant',
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    returnPath?: string;
  };
}) {
  const id = params.id;
  const returnPath = searchParams?.returnPath || '';

  const [participant, users, studies] = await Promise.all([
    fetchParticipantById(id),
    fetchUsers(),
    fetchStudies(),
  ]);

  if (!participant) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Participants', href: '/dashboard/participants' },
          {
            label: 'Edit Participant',
            href: `/dashboard/participants/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form
        participant={participant}
        users={users}
        studies={studies}
        returnPath={returnPath}
      />
    </main>
  );
}
