import Image from 'next/image';

import { fetchFilteredBiases } from '@/app/lib/data/biases';
import { DeleteBias, UpdateBias } from './buttons';
import BiasStatus from './status';

export default async function BiasesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const biases = await fetchFilteredBiases(query, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {biases?.map((bias) => (
                <div
                  key={bias.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        {/* <div className="flex items-center gap-3">
                          <Image
                            src={bias.image_url}
                            className="rounded-full"
                            alt={`${bias.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{bias.name}</p>
                        </div> */}
                      </div>
                      <p className="text-sm text-gray-500">{bias.name}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateBias id={bias.id} />
                      <DeleteBias id={bias.id} />
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
                    Total Bias Statements
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {biases.map((bias) => (
                  <tr
                    key={bias.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        {/* <Image
                          src={bias.image_url}
                          className="rounded-full"
                          alt={`${bias.name}'s profile picture`}
                          width={28}
                          height={28}
                        /> */}
                        <p>{bias.name}</p>
                      </div>
                    </td>

                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {bias.total_studies}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {bias.total_bias_statements}
                    </td>

                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateBias id={bias.id} />
                        <DeleteBias id={bias.id} />
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
