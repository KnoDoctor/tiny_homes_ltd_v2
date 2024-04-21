'use client';

import {
  UserGroupIcon,
  UsersIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  BoltIcon,
  BeakerIcon,
  NewspaperIcon,
  TagIcon,
  ClipboardDocumentListIcon,
  ChatBubbleBottomCenterTextIcon,
  ChatBubbleLeftEllipsisIcon,
  ScaleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { lato, roboto } from './fonts';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  {
    name: 'Tiny Homes',
    href: '/tiny-homes',
    icon: NewspaperIcon,
  },
  {
    name: 'About Us',
    href: '/about-us',
    icon: TagIcon,
  },
  // {
  //   name: 'Comments',
  //   href: '/dashboard/athletes',
  //   icon: ChatBubbleLeftEllipsisIcon,
  // },
  {
    name: 'Contact',
    href: '/contact-us',
    icon: UsersIcon,
  },
  {
    name: '',
    href: '/search',
    icon: MagnifyingGlassIcon,
  },
  // { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link, i, arr) => {
        const LinkIcon = link.icon;
        return (
          <div
            key={link.name}
            className={`${lato.className} flex w-full flex-col items-center justify-center bg-stone-800`}
          >
            <Link
              href={link.href}
              className={clsx(
                'flex h-[48px] w-full grow items-center justify-center gap-2 bg-stone-800 p-3 text-sm  font-medium hover:bg-stone-800 hover:text-stone-200 md:flex-none md:justify-center md:p-2 md:px-3',
                roboto.className,
                {
                  'bg-stone-800 text-stone-50': pathname === link.href,
                },
                {
                  'bg-stone-800 text-stone-500': pathname !== link.href,
                },
              )}
            >
              <LinkIcon
                className={clsx('block w-4', {
                  'md:hidden': link.name !== '',
                })}
              />
              <p className={'hidden text-lg font-light md:block'}>
                {link.name}
              </p>
            </Link>
            {i + 1 === arr.length ? (
              <></>
            ) : (
              <hr className="my-1 hidden h-px w-16 border-stone-500 bg-stone-500 dark:bg-gray-700 md:block" />
            )}
          </div>
        );
      })}
    </>
  );
}
