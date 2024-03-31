import Link from 'next/link';
import React from 'react';
import { lusitana } from '../fonts';
import clsx from 'clsx';

const Sidebar = () => {
  return (
    <div className="w-3/12">
      <div className="h-full w-full bg-stone-100 px-8 py-8 ">
        <div className="w-full 2xl:w-10/12 ">
          <h2
            className={clsx(
              lusitana.className,
              'mb-4 flex text-xl md:text-2xl',
            )}
          >
            Recent posts
          </h2>

          <div className="divide-y divide-stone-300">
            <div className="px-4 py-4">
              <Link href="/2021/01/02/a-frame-design-provides-a-quiet-space-in-lake-tahoe/">
                <div>A Frame Design Provides A Quiet Space in Lake Tahoe</div>
              </Link>
            </div>
            <div className="px-4 py-4">
              <Link href="/">
                <div>The Nags Head Packs Modern Luxury Into a Compact THOW</div>
              </Link>
            </div>
            <div className="px-4 py-4">
              <Link href="/">
                <div>
                  The Braxton Offers A Truly Modern Tiny Living Experience
                </div>
              </Link>
            </div>

            <div className="px-4 py-4">
              <Link href="/">
                <div>Downsizing Turns To Upgrading With This Stunning Home</div>
              </Link>
            </div>
            <div className="px-4 py-4">
              <Link href="/">
                <div>
                  This Tiny House on Wheels Offers A Modern and Masculine
                  Sanctuary
                </div>
              </Link>
            </div>
          </div>
          <h2
            className={clsx(
              lusitana.className,
              'mt-8 flex text-xl md:text-2xl',
            )}
          >
            Recent comments
          </h2>
          <div className="divide-y divide-solid">
            <Link href="/">
              <div className="px-4 py-2">
                A Frame Design Provides A Quiet Space in Lake Tahoe
              </div>
            </Link>
            <Link href="/">
              <div className="px-4 py-2">
                The Nags Head Packs Modern Luxury Into a Compact THOW
              </div>
            </Link>
            <Link href="/">
              <div className="px-4 py-2">
                The Braxton Offers A Truly Modern Tiny Living Experience
              </div>
            </Link>
            <Link href="/">
              <div className="px-4 py-2">
                Downsizing Turns To Upgrading With This Stunning Home
              </div>
            </Link>
            <Link href="/">
              <div className="px-4 py-2">
                This Tiny House on Wheels Offers A Modern and Masculine
                Sanctuary
              </div>
            </Link>
          </div>
          <h2
            className={clsx(
              lusitana.className,
              'mt-8 flex text-xl md:text-2xl',
            )}
          >
            Archieve
          </h2>
          <div className="divide-y divide-solid">
            <Link href="/">
              <div className="px-4 py-2">
                A Frame Design Provides A Quiet Space in Lake Tahoe
              </div>
            </Link>
            <Link href="/">
              <div className="px-4 py-2">
                The Nags Head Packs Modern Luxury Into a Compact THOW
              </div>
            </Link>
            <Link href="/">
              <div className="px-4 py-2">
                The Braxton Offers A Truly Modern Tiny Living Experience
              </div>
            </Link>
            <Link href="/">
              <div className="px-4 py-2">
                Downsizing Turns To Upgrading With This Stunning Home
              </div>
            </Link>
            <Link href="/">
              <div className="px-4 py-2">
                This Tiny House on Wheels Offers A Modern and Masculine
                Sanctuary
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
