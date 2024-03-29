import Image from 'next/image';

import { fetchFilteredParticipants } from '@/app/lib/data/participants';
import { DeleteParticipant, UpdateParticipant } from './buttons';
import ParticipantStatus from './status';

export default async function ParticipantsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const participants = await fetchFilteredParticipants(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {participants?.map((participant) => (
                <div
                  key={participant.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        {/* <div className="flex items-center gap-3">
                          <Image
                            src={participant.image_url}
                            className="rounded-full"
                            alt={`${participant.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{participant.name}</p>
                        </div> */}
                      </div>
                      <p className="text-sm text-gray-500">
                        {participant.user.name}
                      </p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateParticipant id={participant.id} />
                      <DeleteParticipant id={participant.id} />
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between border-b py-5">
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Pending</p>
                      <p className="font-medium">{participant.name}</p>
                    </div>
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Paid</p>
                      <p className="font-medium">{participant.name}</p>
                    </div>
                  </div>
                  <div className="pt-4 text-sm">
                    <p>{participant.name} invoices</p>
                  </div>
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
                    Study
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Is Control?
                  </th>

                  <th scope="col" className="px-3 py-5 font-medium">
                    Total Responses Created
                  </th>
                  {/* <th scope="col" className="px-4 py-5 font-medium">
                    Total In Progress
                  </th> */}
                  <th scope="col" className="px-4 py-5 font-medium">
                    Total Completed
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {participants.map((participant) => (
                  <tr
                    key={participant.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        {/* <Image
                          src={participant.image_url}
                          className="rounded-full"
                          alt={`${participant.name}'s profile picture`}
                          width={28}
                          height={28}
                        /> */}
                        <p>{participant.user.name}</p>
                      </div>
                    </td>

                    {/* <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {participant.sport.name}
                    </td> */}

                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      <p>{participant.study.name}</p>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      <p>{participant.is_control ? 'Yes' : 'No'}</p>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {participant.total_responses}
                    </td>
                    {/* <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {participant.total_in_progress}
                    </td> */}
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {participant.total_complete}
                    </td>

                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateParticipant id={participant.id} />
                        <DeleteParticipant id={participant.id} />
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
