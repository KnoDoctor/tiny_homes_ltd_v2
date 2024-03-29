import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteBiasStatement } from '@/app/lib/actions/bias_statements';
import { SearchParams } from '@/app/lib/definitions';
import { appendSearchParamsToUrl } from '@/app/lib/utils';

export function CreateBiasStatement({
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
              '/dashboard/bias-statements/create',
              searchParams,
            )
          : '/dashboard/bias-statements/create'
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
        <span className="hidden md:block">Create Bias Statement</span>
      )}
      <PlusIcon className={disableText ? 'w-5' : 'h-5 md:ml-4'} />
    </Link>
  );
}

export function UpdateBiasStatement({
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
              `/dashboard/bias-statements/${id}/edit`,
              searchParams,
            )
          : `/dashboard/bias-statements/${id}/edit`
      }
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteBiasStatement({ id }: { id: string }) {
  const deleteBiasStatementWithId = deleteBiasStatement.bind(null, id);
  return (
    <form action={deleteBiasStatementWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
