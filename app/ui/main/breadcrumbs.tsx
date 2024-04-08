import { clsx } from 'clsx';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <div className="flex">
      <div className="flex w-full justify-center px-8 lg:w-8/12 2xl:w-9/12">
        <div className="w-full 2xl:w-10/12">
          <nav aria-label="Breadcrumb" className="mb-6 block">
            <ol
              className={clsx(lusitana.className, 'flex text-xl md:text-2xl')}
            >
              {breadcrumbs.length === 0 ? (
                <>
                  <li
                    aria-current={false}
                    className={'flex h-8 items-center text-gray-500'}
                  >
                    <Link href={'/'}>
                      <HomeIcon className="w-4" />
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li
                    aria-current={false}
                    className={'flex items-center text-gray-500'}
                  >
                    <Link href={'/'}>
                      <HomeIcon className="w-4" />
                    </Link>
                  </li>
                  <li
                    aria-current={false}
                    className={'flex items-center text-gray-500'}
                  >
                    <ChevronRightIcon className="w-3" />
                  </li>
                </>
              )}
              {breadcrumbs.map((breadcrumb, index) => (
                <li
                  key={breadcrumb.href}
                  aria-current={breadcrumb.active}
                  className={clsx(
                    'h-8',
                    breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
                  )}
                >
                  <Link href={breadcrumb.href} className={'text-sm'}>
                    {breadcrumb.label}
                  </Link>
                  {index < breadcrumbs.length - 1 ? (
                    <span className="mx-3 inline-block">/</span>
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}
