import Form from '@/app/ui/_categories/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCategories } from '@/app/lib/data/categories';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Category',
};

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/dashboard/categories' },
          {
            label: 'Create Category',
            href: '/dashboard/categories/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
