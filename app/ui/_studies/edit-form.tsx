'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateStudy } from '@/app/lib/actions/studies';
import {
  UserCircleIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { BiasField, ParticipantField, SportField } from '@/app/lib/definitions';
import {
  CreateParticipant,
  DeleteParticipant,
  UpdateParticipant,
} from '../_participants/buttons';

export default function EditStudyForm({
  study,
  sports,
  biases,
  participants,
}: {
  study: any;
  sports: SportField[];
  biases: BiasField[];
  participants: ParticipantField[];
}) {
  const initialState = { message: null, errors: {} };
  const updateStudyWithId = updateStudy.bind(null, study.id);
  const [state, dispatch] = useFormState(updateStudyWithId, initialState);

  return (
    <>
      <form action={dispatch}>
        {/* Submit */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/studies"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Save Study</Button>
        </div>
        <div className="mt-2 rounded-md bg-gray-50 p-4 md:p-6">
          {/* Study Name */}
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Study Name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter study's full name"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="amount-error"
                  defaultValue={study.name}
                  // required
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            <div id="study-error" aria-live="polite" aria-atomic="true">
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
                defaultValue={study.sport_id}
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
                defaultValue={study.bias_id}
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

          {/* Study Status */}
          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              Set the study status
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
                    defaultChecked={study.status === 'draft'}
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
                    defaultChecked={study.status === 'finalized'}
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
                    defaultChecked={study.status === 'cancelled'}
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
                    defaultChecked={study.status === 'in_progress'}
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
                    defaultChecked={study.status === 'complete'}
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
          </fieldset>
        </div>
      </form>
      <div className="mt-4 w-1/2 rounded-md bg-gray-50 p-4 md:p-6">
        <table className="hidden min-w-full rounded-md text-gray-900 md:table">
          <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                Participants
              </th>
              <th className="h-1 whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  <CreateParticipant
                    disableText
                    searchParams={[
                      { key: 'studyId', value: study.id },
                      {
                        key: 'returnPath',
                        value: `/dashboard/studies/${study.id}/edit`,
                      },
                    ]}
                  />
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {participants
              .filter((participant) => participant.study.id === study.id)
              .map((participant) => (
                <tr
                  key={participant.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className=" py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{participant.user.name}</p>
                    </div>
                    <div className="mt-2 flex items-center">
                      <p className="hidden text-xs text-gray-500 sm:block">
                        {participant.is_control
                          ? 'Control Group'
                          : 'Test Group'}
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {/* <CheckCircleIcon/> */}
                      <UpdateParticipant
                        searchParams={[
                          {
                            key: 'returnPath',
                            value: `/dashboard/studies/${study.id}/edit`,
                          },
                        ]}
                        id={participant.id}
                      />
                      <DeleteParticipant id={participant.id} />
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
