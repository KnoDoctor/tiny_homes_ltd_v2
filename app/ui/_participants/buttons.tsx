import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteParticipant } from '@/app/lib/actions/participants';
import { SearchParams } from '@/app/lib/definitions';
import { appendSearchParamsToUrl } from '@/app/lib/utils';

export function CreateParticipant({
  disableText,
  searchParams,
}: {
  disableText?: boolean;
  searchParams?: SearchParams;
}) {
  return (
    <Link
      href={
        searchParams
          ? appendSearchParamsToUrl(
              '/dashboard/participants/create',
              searchParams,
            )
          : '/dashboard/participants/create'
      }
      className={
        disableText
          ? 'rounded-md border bg-blue-600 bg-blue-600 p-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
          : 'flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
      }
    >
      {disableText ? (
        <></>
      ) : (
        <span className="hidden md:block">Create Participant</span>
      )}
      <PlusIcon className={disableText ? 'w-5' : 'h-5 md:ml-4'} />
    </Link>
  );
}

export function UpdateParticipant({
  id,
  searchParams,
}: {
  id: string;
  searchParams?: SearchParams;
}) {
  return (
    <Link
      href={
        searchParams
          ? appendSearchParamsToUrl(
              `/dashboard/participants/${id}/edit`,
              searchParams,
            )
          : `/dashboard/participants/${id}/edit`
      }
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteParticipant({ id }: { id: string }) {
  const deleteParticipantWithId = deleteParticipant.bind(null, id);
  return (
    <form action={deleteParticipantWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
