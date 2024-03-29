import Form from '@/app/ui/_responses/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchParticipants } from '@/app/lib/data/participants';
import { Metadata } from 'next';
import { fetchStudies } from '@/app/lib/data/studies';
import { fetchAthletes } from '@/app/lib/data/athletes';

export const metadata: Metadata = {
  title: 'Create Response',
};

export default async function Page() {
  const participants = await fetchParticipants();
  const studies = await fetchStudies();
  const athletes = await fetchAthletes();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Responses', href: '/dashboard/responses' },
          {
            label: 'Create Response',
            href: '/dashboard/responses/create',
            active: true,
          },
        ]}
      />
      <Form participants={participants} studies={studies} athletes={athletes} />
    </main>
  );
}
