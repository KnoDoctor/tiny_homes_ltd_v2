import Form from '@/app/ui/_bias_statements/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
import { fetchBiases } from '@/app/lib/data/biases';
import { fetchAthletes } from '@/app/lib/data/athletes';

export const metadata: Metadata = {
  title: 'Create BiasStatement',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    athleteId?: string;
    returnPath?: string;
  };
}) {
  const athletes = await fetchAthletes();
  const biases = await fetchBiases();

  const athleteId = searchParams?.athleteId || '';
  const returnPath = searchParams?.returnPath || '';

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Bias Statements', href: '/dashboard/bias-statements' },
          {
            label: 'Create Bias Statement',
            href: '/dashboard/bias-statements/create',
            active: true,
          },
        ]}
      />
      <Form
        biases={biases}
        athletes={athletes}
        athleteId={athleteId}
        returnPath={returnPath}
      />
    </main>
  );
}
