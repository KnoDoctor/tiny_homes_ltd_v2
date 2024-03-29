import Form from '@/app/ui/_participants/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
import { fetchSports } from '@/app/lib/data/sports';
import { fetchStudies } from '@/app/lib/data/studies';
import { SportField, StudyField } from '@/app/lib/definitions';
import { fetchUsers } from '@/app/lib/data/users';

export const metadata: Metadata = {
  title: 'Create Participant',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    studyId?: string;
    returnPath?: string;
  };
}) {
  const [users, studies] = await Promise.all([fetchUsers(), fetchStudies()]);

  const studyId = searchParams?.studyId || '';
  const returnPath = searchParams?.returnPath || '';

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Participants', href: '/dashboard/participants' },
          {
            label: 'Create Participant',
            href: '/dashboard/participants/create',
            active: true,
          },
        ]}
      />
      <Form
        users={users}
        studies={studies}
        studyId={studyId}
        returnPath={returnPath}
      />
    </main>
  );
}
