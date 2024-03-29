'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createParticipant } from '@/app/lib/actions/participants';
import { useFormState } from 'react-dom';
import {
  UserCircleIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { SportField, StudyField, UserField } from '@/app/lib/definitions';

export default function Form({
  users,
  studies,
  studyId,
  returnPath,
}: {
  users: UserField[];
  studies: StudyField[];
  studyId: string;
  returnPath: string;
}) {
  const initialState = { message: null, errors: {} };

  const [state, dispatch] = useFormState(createParticipant, initialState);

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
              defaultValue=""
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
              defaultValue={studyId || ''}
              // disabled={studyId ? true : false}
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
              defaultValue=""
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
      </div>

      {/* Hidden Field that passes the returnPath*/}
      <input type="hidden" name="returnPath" value={returnPath} />

      {/* Submit*/}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={returnPath || '/dashboard/participants'}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Participant</Button>
      </div>
    </form>
  );
}
