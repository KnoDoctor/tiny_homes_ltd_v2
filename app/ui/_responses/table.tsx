import Image from 'next/image';

import { fetchFilteredResponses } from '@/app/lib/data/responses';
import { DeleteResponse, UpdateResponse } from './buttons';
import ResponseStatus from './status';

export default async function ResponsesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const responses = await fetchFilteredResponses(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {responses?.map((response) => (
                <div
                  key={response.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center"></div>
                      <p className="text-sm text-gray-500">{response.id}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateResponse id={response.id} />
                      <DeleteResponse id={response.id} />
                    </div>
                  </div>

                  <div className="pt-4 text-sm">
                    <p>{response.id} invoices</p>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full rounded-md text-gray-900 md:table">
              <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Study
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    User
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {responses.map((response) => (
                  <tr
                    key={response.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {response.participant.study.name}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{response.participant.user.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      <ResponseStatus status={response.status} />
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateResponse id={response.id} />
                        <DeleteResponse id={response.id} />
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
