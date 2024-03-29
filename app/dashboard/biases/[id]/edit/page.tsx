import Form from '@/app/ui/_biases/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchBiasById } from '@/app/lib/data/biases';

import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Bias',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const bias = await fetchBiasById(id);

  if (!bias) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Biases', href: '/dashboard/biases' },
          {
            label: 'Edit Bias',
            href: `/dashboard/biases/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form bias={bias} />
    </main>
  );
}
