'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateParticipant } from '@/app/lib/actions/participants';
import {
  UserCircleIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { SportField, StudyField, UserField } from '@/app/lib/definitions';

export default function EditParticipantForm({
  participant,
  users,
  studies,
  returnPath,
}: {
  participant: any;
  users: UserField[];
  studies: StudyField[];
  returnPath: string;
}) {
  const initialState = { message: null, errors: {} };
  const updateParticipantWithId = updateParticipant.bind(null, participant.id);
  const [state, dispatch] = useFormState(updateParticipantWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* User */}
        <div className="mb-4">
          <label htmlFor="user" className="mb-2 block text-sm font-medium">
            Choose user
          </label>
          <div className="relative">
            <select
              id="user"
              name="userId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={participant.user_id}
              // required
              aria-describedby="user-error"
            >
              <option value="" disabled>
                Select a user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="study-error" aria-live="polite" aria-atomic="true">
            {state.errors?.userId &&
              state.errors.userId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Study */}
        <div className="mb-4">
          <label htmlFor="study" className="mb-2 block text-sm font-medium">
            Choose study
          </label>
          <div className="relative">
            <select
              id="study"
              name="studyId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={participant.study_id}
              // required
              aria-describedby="study-error"
            >
              <option value="" disabled>
                Select a study
              </option>
              {studies.map((study) => (
                <option key={study.id} value={study.id}>
                  {study.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="study-error" aria-live="polite" aria-atomic="true">
            {state.errors?.studyId &&
              state.errors.studyId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Is Control */}
        <div className="mb-4">
          <label htmlFor="isControl" className="mb-2 block text-sm font-medium">
            Is participant in control group?
          </label>
          <div className="relative">
            <select
              id="is_control"
              name="isControl"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={participant.is_control}
              // required
              aria-describedby="is-control-error"
            >
              <option value="" disabled>
                Select an option
              </option>

              <option value={'true'}>Yes</option>
              <option value={'false'}>No</option>
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="is-control-error" aria-live="polite" aria-atomic="true">
            {state.errors?.isControl &&
              state.errors.isControl.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Participant Status */}
        {/* <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the participant status
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
                  defaultChecked={participant.status === 'draft'}
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
                  defaultChecked={participant.status === 'finalized'}
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
                  defaultChecked={participant.status === 'cancelled'}
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
                  defaultChecked={participant.status === 'in_progress'}
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
                  defaultChecked={participant.status === 'complete'}
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
          href={returnPath || '/dashboard/participants'}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save Participant</Button>
      </div>
    </form>
  );
}
