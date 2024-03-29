import Form from '@/app/ui/_bias_statements/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchBiasStatementById } from '@/app/lib/data/bias_statements';

import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { fetchAthletes } from '@/app/lib/data/athletes';
import { fetchBiases } from '@/app/lib/data/biases';

export const metadata: Metadata = {
  title: 'Edit BiasStatement',
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

  const [biasStatement, athletes, biases] = await Promise.all([
    fetchBiasStatementById(id),

    fetchAthletes(),
    fetchBiases(),
  ]);

  if (!biasStatement) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Bias Statements', href: '/dashboard/bias-statements' },
          {
            label: 'Edit Bias Statement',
            href: `/dashboard/bias-statements/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form
        biasStatement={biasStatement}
        athletes={athletes}
        biases={biases}
        returnPath={returnPath}
      />
    </main>
  );
}
