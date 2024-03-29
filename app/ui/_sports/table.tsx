import Image from 'next/image';

import { fetchFilteredSports } from '@/app/lib/data/sports';
import { DeleteSport, UpdateSport } from './buttons';
import SportStatus from './status';

export default async function SportsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const sports = await fetchFilteredSports(query, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {sports?.map((sport) => (
                <div
                  key={sport.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        {/* <div className="flex items-center gap-3">
                          <Image
                            src={sport.image_url}
                            className="rounded-full"
                            alt={`${sport.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{sport.name}</p>
                        </div> */}
                      </div>
                      <p className="text-sm text-gray-500">{sport.name}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateSport id={sport.id} />
                      <DeleteSport id={sport.id} />
                    </div>
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
                    Total Studies
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total Athletes
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {sports.map((sport) => (
                  <tr
                    key={sport.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        {/* <Image
                          src={sport.image_url}
                          className="rounded-full"
                          alt={`${sport.name}'s profile picture`}
                          width={28}
                          height={28}
                        /> */}
                        <p>{sport.name}</p>
                      </div>
                    </td>

                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {sport.total_studies}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {sport.total_athletes}
                    </td>

                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateSport id={sport.id} />
                        <DeleteSport id={sport.id} />
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
