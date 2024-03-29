import Image from 'next/image';

import { fetchFilteredPosts } from '@/app/lib/data/posts';
import { DeletePost, UpdatePost } from './buttons';
import PostStatus from './status';

export default async function PostsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const posts = await fetchFilteredPosts(query, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {posts?.map((post) => (
                <div
                  key={post.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        {/* <div className="flex items-center gap-3">
                          <Image
                            src={post.image_url}
                            className="rounded-full"
                            alt={`${post.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{post.name}</p>
                        </div> */}
                      </div>
                      <p className="text-sm text-gray-500">{post.name}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdatePost id={post.id} />
                      <DeletePost id={post.id} />
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between border-b py-5">
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Pending</p>
                      <p className="font-medium">{post.name}</p>
                    </div>
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Paid</p>
                      <p className="font-medium">{post.name}</p>
                    </div>
                  </div>
                  <div className="pt-4 text-sm">
                    <p>{post.name} invoices</p>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full rounded-md text-gray-900 md:table">
              <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Sport
                  </th>

                  <th scope="col" className="px-3 py-5 font-medium">
                    Total Participants
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total In Progress
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Total Complete
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap px-3 py-3">
                      <PostStatus status={post.status} />
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        {/* <Image
                          src={post.image_url}
                          className="rounded-full"
                          alt={`${post.name}'s profile picture`}
                          width={28}
                          height={28}
                        /> */}
                        <p>{post.name}</p>
                      </div>
                    </td>

                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {post.sport.name}
                    </td>

                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {post.total_participants}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {post.total_in_progress}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {post.total_complete}
                    </td>

                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdatePost id={post.id} />
                        <DeletePost id={post.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
