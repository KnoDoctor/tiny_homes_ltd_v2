import Form from '@/app/ui/_biases/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchBiases } from '@/app/lib/data/biases';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Bias',
};

export default async function Page() {
  const biases = await fetchBiases();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Biases', href: '/dashboard/biases' },
          {
            label: 'Create Bias',
            href: '/dashboard/biases/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
