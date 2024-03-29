'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateBiasStatement } from '@/app/lib/actions/bias_statements';
import {
  UserCircleIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { AthleteField, BiasField, SportField } from '@/app/lib/definitions';

export default function EditBiasStatementForm({
  biasStatement,
  athletes,
  biases,
  returnPath,
}: {
  biasStatement: any;
  athletes: AthleteField[];
  biases: BiasField[];
  returnPath: string;
}) {
  const initialState = { message: null, errors: {} };
  const updateBiasStatementWithId = updateBiasStatement.bind(
    null,
    biasStatement.id,
  );
  const [state, dispatch] = useFormState(
    updateBiasStatementWithId,
    initialState,
  );

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* BiasStatement Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Bias Statement Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your bias statement name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
                defaultValue={biasStatement.name}
                // required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="biasStatement-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Athlete */}
        <div className="mb-4">
          <label htmlFor="athlete" className="mb-2 block text-sm font-medium">
            Choose Athlete
          </label>
          <div className="relative">
            <select
              id="athlete"
              name="athleteId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={biasStatement.athlete_id}
              // required
              aria-describedby="athlete-error"
            >
              <option value="" disabled>
                Select an athlete
              </option>
              {athletes.map((athlete) => (
                <option key={athlete.id} value={athlete.id}>
                  {athlete.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="athlete-error" aria-live="polite" aria-atomic="true">
            {state.errors?.athleteId &&
              state.errors.athleteId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Bias */}
        <div className="mb-4">
          <label htmlFor="bias" className="mb-2 block text-sm font-medium">
            Choose Bias
          </label>
          <div className="relative">
            <select
              id="bias"
              name="biasId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={biasStatement.bias_id}
              // required
              aria-describedby="bias-error"
            >
              <option value="" disabled>
                Select a bias
              </option>
              {biases.map((bias) => (
                <option key={bias.id} value={bias.id}>
                  {bias.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="bias-error" aria-live="polite" aria-atomic="true">
            {state.errors?.biasId &&
              state.errors.biasId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* BiasStatement Status */}
        {/* <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the biasStatement status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="draft"
                  name="status"
                  type="radio"
                  value="draft"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-50 text-gray-500 focus:ring-2"
                  defaultChecked={biasStatement.status === 'draft'}
                />
                <label
                  htmlFor="draft"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500"
                >
                  Draft <PencilIcon className="h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="finalized"
                  name="status"
                  type="radio"
                  value="finalized"
                  className="h-4 w-4 cursor-pointer border-yellow-300 bg-yellow-50 text-yellow-600 focus:ring-2" // Swapped to yellow
                  defaultChecked={biasStatement.status === 'finalized'}
                />
                <label
                  htmlFor="finalized"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-medium text-yellow-600" // Swapped to yellow
                >
                  Finalized <CheckCircleIcon className="h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="cancelled"
                  name="status"
                  type="radio"
                  value="cancelled"
                  className="h-4 w-4 cursor-pointer border-red-300 bg-red-50 text-red-600 focus:ring-2"
                  defaultChecked={biasStatement.status === 'cancelled'}
                />
                <label
                  htmlFor="cancelled"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600"
                >
                  Cancelled <XCircleIcon className="h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="in_progress"
                  name="status"
                  type="radio"
                  value="in_progress"
                  className="h-4 w-4 cursor-pointer border-blue-300 bg-blue-50 text-blue-600 focus:ring-2"
                  defaultChecked={biasStatement.status === 'in_progress'}
                />
                <label
                  htmlFor="in_progress"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600"
                >
                  In Progress <ClockIcon className="h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="complete"
                  name="status"
                  type="radio"
                  value="complete"
                  className="h-4 w-4 cursor-pointer border-green-300 bg-green-50 text-green-600 focus:ring-2" // Swapped to green
                  defaultChecked={biasStatement.status === 'complete'}
                />
                <label
                  htmlFor="complete"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-600" // Swapped to green
                >
                  Complete <DocumentCheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset> */}
      </div>

      {/* Hidden Field that passes the returnPath*/}
      <input type="hidden" name="returnPath" value={returnPath} />

      {/* Submit */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={returnPath || '/dashboard/bias-statements'}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save Bias Statement</Button>
      </div>
    </form>
  );
}
