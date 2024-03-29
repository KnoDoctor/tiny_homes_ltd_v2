import Form from '@/app/ui/_posts/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchPostById } from '@/app/lib/data/posts';

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchSports } from '@/app/lib/data/sports';
import { fetchBiases } from '@/app/lib/data/biases';
import { fetchParticipants } from '@/app/lib/data/participants';

export const metadata: Metadata = {
  title: 'Edit Post',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const [post, sports, biases, participants] = await Promise.all([
    fetchPostById(id),
    fetchSports(),
    fetchBiases(),
    fetchParticipants(),
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
      <Form
        post={post}
        sports={sports}
        biases={biases}
        participants={participants}
      />
    </main>
  );
}
