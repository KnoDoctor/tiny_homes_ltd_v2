import Link from 'next/link';

import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import NavLinks from './nav-links';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col ">
      <Link
        className="flex h-20 items-center justify-center bg-stone-800 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0">
        <NavLinks />
        <div
          className={
            'flex h-[48px] grow items-center justify-center gap-2 bg-stone-800 p-3 text-sm font-medium uppercase hover:bg-stone-800 hover:text-stone-200 md:flex-none md:justify-center md:p-2 md:px-3'
          }
        >
          <MagnifyingGlassIcon className="w-4 text-stone-500" />
          {/* <p className="hidden md:block">{link.name}</p> */}
        </div>
        <div className="hidden h-auto w-full grow  bg-stone-800 md:block"></div>
        {/* <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form> */}
      </div>
    </div>
  );
}
