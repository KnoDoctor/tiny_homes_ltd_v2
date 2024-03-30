import Image from 'next/image';

import { fetchFilteredUsers } from '@/app/lib/data/users';
import { DeleteUser, UpdateUser } from './buttons';

export default async function UsersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const users = await fetchFilteredUsers(query, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {users?.map((user) => (
                <div
                  key={user.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="flex items-center gap-3">
                          <p>{user.name}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateUser id={user.id} />
                      <DeleteUser id={user.id} />
                    </div>
                  </div>
                  {/* <div className="flex w-full items-center justify-between border-b py-5">
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Pending</p>
                      <p className="font-medium">{user.total_pending}</p>
                    </div>
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Paid</p>
                      <p className="font-medium">{user.total_paid}</p>
                    </div>
                  </div>
                  <div className="pt-4 text-sm">
                    <p>{user.total_invoices} invoices</p>
                  </div> */}
                </div>
              ))}
            </div>
            <table className="hidden min-w-full rounded-md text-gray-900 md:table">
              <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Posts
                  </th>
                  {/* <th scope="col" className="px-3 py-5 font-medium">
                    Total Invoices
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total Pending
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Total Paid
                  </th> */}
                </tr>
              </thead>

              <tbody className="bg-white">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{user.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {user.posts.length}
                    </td>
                    {/*     <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {user.total_pending}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      {user.total_paid}
                    </td>*/}
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateUser id={user.id} />
                        <DeleteUser id={user.id} />
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
