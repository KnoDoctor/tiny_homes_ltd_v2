'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateAthlete } from '@/app/lib/actions/athletes';
import {
  UserCircleIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { BiasStatementField, SportField } from '@/app/lib/definitions';
import {
  CreateBiasStatement,
  DeleteBiasStatement,
  UpdateBiasStatement,
} from '../_bias_statements/buttons';

export default function EditAthleteForm({
  athlete,
  sports,
  bias_statements,
}: {
  athlete: any;
  sports: SportField[];
  bias_statements: BiasStatementField[];
}) {
  const initialState = { message: null, errors: {} };
  const updateAthleteWithId = updateAthlete.bind(null, athlete.id);
  const [state, dispatch] = useFormState(updateAthleteWithId, initialState);

  return (
    <>
      <form action={dispatch}>
        {/* Submit */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/athletes"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Save Athlete</Button>
        </div>
        <div className="mt-2 rounded-md bg-gray-50 p-4 md:p-6">
          {/* Athlete Name */}
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Athlete Name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter athlete's full name"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="amount-error"
                  defaultValue={athlete.name}
                  // required
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            <div id="athlete-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* Sport */}
          <div className="mb-4">
            <label htmlFor="sport" className="mb-2 block text-sm font-medium">
              Choose sport
            </label>
            <div className="relative">
              <select
                id="sport"
                name="sportId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={athlete.sport_id}
                // required
                aria-describedby="sport-error"
              >
                <option value="" disabled>
                  Select a sport
                </option>
                {sports.map((sport) => (
                  <option key={sport.id} value={sport.id}>
                    {sport.name}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="sport-error" aria-live="polite" aria-atomic="true">
              {state.errors?.sportId &&
                state.errors.sportId.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </form>
      <div className="mt-4 w-1/2 rounded-md bg-gray-50 p-4 md:p-6">
        <table className="hidden min-w-full rounded-md text-gray-900 md:table">
          <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                Bias Statements
              </th>
              <th className="h-1 whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  <CreateBiasStatement
                    disableText
                    searchParams={[
                      { key: 'athleteId', value: athlete.id },
                      {
                        key: 'returnPath',
                        value: `/dashboard/athletes/${athlete.id}/edit`,
                      },
                    ]}
                  />
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {bias_statements
              .filter(
                (bias_statement) => bias_statement.athlete.id === athlete.id,
              )
              .map((bias_statement) => (
                <tr
                  key={bias_statement.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className=" py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{bias_statement.name}</p>
                    </div>
                    <div className="mt-2 flex items-center">
                      <p className="hidden text-xs text-gray-500 sm:block">
                        {bias_statement.bias.name}
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {/* <CheckCircleIcon/> */}
                      <UpdateBiasStatement
                        searchParams={[
                          {
                            key: 'returnPath',
                            value: `/dashboard/athletes/${athlete.id}/edit`,
                          },
                        ]}
                        id={bias_statement.id}
                      />
                      <DeleteBiasStatement id={bias_statement.id} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* <textarea
            className="h-64 w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter your bias statement here..."
          ></textarea> */}
      </div>
    </>
  );
}
