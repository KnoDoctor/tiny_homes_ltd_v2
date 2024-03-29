'use client';
import {
  AthleteField,
  ParticipantField,
  StudyField,
} from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createResponse } from '@/app/lib/actions/responses';
import { useFormState } from 'react-dom';
import {
  UserCircleIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';

export default function Form({
  participants,
  athletes,
  studies,
}: {
  participants: ParticipantField[];
  athletes: AthleteField[];
  studies: StudyField[];
}) {
  const initialState = { message: null, errors: {} };

  const [state, dispatch] = useFormState(createResponse, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Response Name */}
        {/* <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Response Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter response's full name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
                // required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="response-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div> */}
        {/* Participant */}
        <div className="mb-4">
          <label
            htmlFor="participant"
            className="mb-2 block text-sm font-medium"
          >
            Choose participant
          </label>
          <div className="relative">
            <select
              id="participant"
              name="participantId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              // required
              aria-describedby="participant-error"
            >
              <option value="" disabled>
                Select a participant
              </option>
              {participants.map((participant) => (
                <option key={participant.id} value={participant.id}>
                  {participant.user.name} | {participant.study.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="participant-error" aria-live="polite" aria-atomic="true">
            {state.errors?.participantId &&
              state.errors.participantId.map((error: string) => (
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
              defaultValue={''}
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

        {/* Response Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the response status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="in_progress"
                  name="status"
                  type="radio"
                  value="in_progress"
                  className="h-4 w-4 cursor-pointer border-blue-300 bg-blue-50 text-blue-600 focus:ring-2"
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
          <div id="participant-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>
      </div>

      {/* Submit*/}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/responses"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Response</Button>
      </div>
    </form>
  );
}
