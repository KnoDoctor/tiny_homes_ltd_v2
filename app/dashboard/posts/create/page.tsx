import Form from '@/app/ui/_posts/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchPosts } from '@/app/lib/data/posts';
import { Metadata } from 'next';
import { fetchUsers } from '@/app/lib/data/users';
// import { fetchSports } from '@/app/lib/data/sports';
// import { fetchBiases } from '@/app/lib/data/biases';

export const metadata: Metadata = {
  title: 'Create Post',
};

export default async function Page() {
  const users = await fetchUsers();
  // const biases = await fetchBiases();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Posts', href: '/dashboard/posts' },
          {
            label: 'Create Post',
            href: '/dashboard/posts/create',
            active: true,
          },
        ]}
      />
      <Form users={users} />
    </main>
  );
}
