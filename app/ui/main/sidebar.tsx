import Link from 'next/link';
import React from 'react';
import { anticDidone, lusitana, roboto } from '../fonts';
import clsx from 'clsx';

const Sidebar = () => {
  return (
    <div className="hidden w-4/12 lg:block 2xl:w-3/12">
      <div className="h-full w-full bg-stone-100 px-8 py-8 ">
        <div className="w-full ">
          <h2
            className={clsx(
              anticDidone.className,
              'mb-4 flex text-xl font-light md:text-4xl',
            )}
          >
            Recent posts
          </h2>
          <hr className="my-4 h-px border-0 bg-stone-300"></hr>
          <div className="divide-y divide-stone-200">
            <div className="px-4 py-4">
              <Link href="/2021/01/02/a-frame-design-provides-a-quiet-space-in-lake-tahoe/">
                <p
                  className={clsx(
                    roboto.className,
                    'mb-4 flex text-xl font-light',
                  )}
                >
                  A Frame Design Provides A Quiet Space in Lake Tahoe
                </p>
              </Link>
            </div>
            <div className="px-4 py-4">
              <Link href="/">
                <p
                  className={clsx(
                    roboto.className,
                    'mb-4 flex text-xl font-light',
                  )}
                >
                  The Nags Head Packs Modern Luxury Into a Compact THOW
                </p>
              </Link>
            </div>
            <div className="px-4 py-4">
              <Link href="/">
                <p
                  className={clsx(
                    roboto.className,
                    'mb-4 flex text-xl font-light',
                  )}
                >
                  The Braxton Offers A Truly Modern Tiny Living Experience
                </p>
              </Link>
            </div>

            <div className="px-4 py-4">
              <Link href="/">
                <p
                  className={clsx(
                    roboto.className,
                    'mb-4 flex text-xl font-light',
                  )}
                >
                  Downsizing Turns To Upgrading With This Stunning Home
                </p>
              </Link>
            </div>
            <div className="px-4 py-4">
              <Link href="/">
                <p
                  className={clsx(
                    roboto.className,
                    'mb-4 flex text-xl font-light',
                  )}
                >
                  This Tiny House on Wheels Offers A Modern and Masculine
                  Sanctuary
                </p>
              </Link>
            </div>
          </div>
          <h2
            className={clsx(
              anticDidone.className,
              'mb-4 flex text-xl font-light md:text-4xl',
            )}
          >
            Recent comments
          </h2>
          <hr className="my-4 h-px border-0 bg-stone-300"></hr>
          <div className="divide-y divide-stone-300">
            <div className="px-4 py-4">
              <Link href="/2021/01/02/a-frame-design-provides-a-quiet-space-in-lake-tahoe/">
                <p
                  className={clsx(
                    roboto.className,
                    'mb-4 flex text-xl font-light',
                  )}
                >
                  A Frame Design Provides A Quiet Space in Lake Tahoe
                </p>
              </Link>
            </div>
            <div className="px-4 py-4">
              <Link href="/">
                <p
                  className={clsx(
                    roboto.className,
                    'mb-4 flex text-xl font-light',
                  )}
                >
                  The Nags Head Packs Modern Luxury Into a Compact THOW
                </p>
              </Link>
            </div>
            <div className="px-4 py-4">
              <Link href="/">
                <p
                  className={clsx(
                    roboto.className,
                    'mb-4 flex text-xl font-light',
                  )}
                >
                  The Braxton Offers A Truly Modern Tiny Living Experience
                </p>
              </Link>
            </div>

            <div className="px-4 py-4">
              <Link href="/">
                <p
                  className={clsx(
                    roboto.className,
                    'mb-4 flex text-xl font-light',
                  )}
                >
                  Downsizing Turns To Upgrading With This Stunning Home
                </p>
              </Link>
            </div>
            <div className="px-4 py-4">
              <Link href="/">
                <p
                  className={clsx(
                    roboto.className,
                    'mb-4 flex text-xl font-light',
                  )}
                >
                  This Tiny House on Wheels Offers A Modern and Masculine
                  Sanctuary
                </p>
              </Link>
            </div>
          </div>
          <h2
            className={clsx(
              anticDidone.className,
              'mb-4 flex text-xl font-light md:text-4xl',
            )}
          >
            Archieve
          </h2>
          <hr className="my-4 h-px border-0 bg-stone-300"></hr>
          <div className="divide-y divide-stone-300">
            <div className="px-4 py-4">
              <Link href="/2021/01/02/a-frame-design-provides-a-quiet-space-in-lake-tahoe/">
                <p
                  className={clsx(
                    roboto.className,
                    'mb-4 flex text-xl font-light',
                  )}
                >
                  A Frame Design Provides A Quiet Space in Lake Tahoe
                </p>
              </Link>
            </div>
            <div className="px-4 py-4">
              <Link href="/">
                <p
                  className={clsx(
                    roboto.className,
                    'mb-4 flex text-xl font-light',
                  )}
                >
                  The Nags Head Packs Modern Luxury Into a Compact THOW
                </p>
              </Link>
            </div>
            <div className="px-4 py-4">
              <Link href="/">
                <p
                  className={clsx(
                    roboto.className,
                    'mb-4 flex text-xl font-light',
                  )}
                >
                  The Braxton Offers A Truly Modern Tiny Living Experience
                </p>
              </Link>
            </div>

            <div className="px-4 py-4">
              <Link href="/">
                <p
                  className={clsx(
                    roboto.className,
                    'mb-4 flex text-xl font-light',
                  )}
                >
                  Downsizing Turns To Upgrading With This Stunning Home
                </p>
              </Link>
            </div>
            <div className="px-4 py-4">
              <Link href="/">
                <p
                  className={clsx(
                    roboto.className,
                    'mb-4 flex text-xl font-light',
                  )}
                >
                  This Tiny House on Wheels Offers A Modern and Masculine
                  Sanctuary
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
