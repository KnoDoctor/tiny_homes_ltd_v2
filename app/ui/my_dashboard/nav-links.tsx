'use client';

import {
  UserGroupIcon,
  UsersIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  BoltIcon,
  BeakerIcon,
  ClipboardDocumentListIcon,
  ChatBubbleBottomCenterTextIcon,
  ScaleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'My Dashboard', href: '/my/dashboard', icon: HomeIcon },
  // {
  //   name: 'My Studies',
  //   href: '/my/dashboard/studies',
  //   icon: BeakerIcon,
  // },
  {
    name: 'My Profile',
    href: '/my/dashboard/sports',
    icon: UserCircleIcon,
  },
  // {
  //   name: 'Athletes',
  //   href: '/dashboard/athletes',
  //   icon: UserGroupIcon,
  // },
  // {
  //   name: 'Biases',
  //   href: '/dashboard/biases',
  //   icon: ScaleIcon,
  // },
  // {
  //   name: 'Bias Statements',
  //   href: '/dashboard/bias-statements',
  //   icon: ChatBubbleBottomCenterTextIcon,
  // },
  // {
  //   name: 'Participants',
  //   href: '/dashboard/participants',
  //   icon: UserGroupIcon,
  // },
  // {
  //   name: 'Responses',
  //   href: '/dashboard/responses',
  //   icon: ClipboardDocumentListIcon,
  // },
  // {
  //   name: 'Users',
  //   href: '/dashboard/users',
  //   icon: UsersIcon,
  // },
  // {
  //   name: 'Invoices',
  //   href: '/dashboard/invoices',
  //   icon: DocumentDuplicateIcon,
  // },
  // { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
