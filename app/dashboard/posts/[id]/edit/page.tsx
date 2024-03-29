import Form from '@/app/ui/_posts/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchPostById } from '@/app/lib/data/posts';

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchUsers } from '@/app/lib/data/users';
import { fetchCategories } from '@/app/lib/data/categories';

export const metadata: Metadata = {
  title: 'Edit Post',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const [post, users, categories] = await Promise.all([
    fetchPostById(id),
    fetchUsers(),
    fetchCategories(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Posts', href: '/dashboard/posts' },
          {
            label: 'Edit Post',
            href: `/dashboard/posts/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form post={post} users={users} categories={categories} />
    </main>
  );
}
