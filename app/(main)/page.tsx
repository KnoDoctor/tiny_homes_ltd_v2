import AcmeLogo from '@/app/ui/acme-logo';
import {
  ArrowRightIcon,
  PaperAirplaneIcon,
  UserPlusIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana, inter, lato } from '@/app/ui/fonts';
import Image from 'next/image';
import Breadcrumbs from '../ui/main/breadcrumbs';
import clsx from 'clsx';
import { Button } from '../ui/button';
import Sidebar from '../ui/main/sidebar';
import FeaturedPost from '../ui/main/feature-post';
import SubFeaturedPost from '../ui/main/sub-featured-post';
import StandarPost from '../ui/main/standard-post';
import { fetchPosts } from '../lib/data/posts';

const samplePosts = [
  {
    title: 'A Frame Design Provides A Quiet Space in Lake Tahoe',
    imageId: 1,
    category: 'Nature',
    author: 'Jeff Barfield',
    createdOn: 'April 4, 2024',
  },
  {
    title: 'The Nags Head Packs Modern Luxury Into a Compact THOW',
    imageId: 2,
    category: 'Design',
    author: 'Jeff Barfield',
    createdOn: 'April 4, 2024',
  },
  {
    title: 'The Braxton Offers A Truly Modern Tiny Living Experience',
    imageId: 3,
    category: 'Design',
    author: 'Jeff Barfield',
    createdOn: 'April 4, 2024',
  },
  {
    title: 'Downsizing Turns To Upgrading With This Stunning Home',
    imageId: 4,
    category: 'Nature',
    author: 'Jeff Barfield',
    createdOn: 'April 4, 2024',
  },
  {
    title: 'This Tiny House on Wheels Offers A Modern and Masculine Sanctuary',
    imageId: 5,
    category: 'Design',
    author: 'Jeff Barfield',
    createdOn: 'April 4, 2024',
  },
];

export default async function Page() {
  const posts = await fetchPosts();
  return (
    <main className="py-2">
      <Breadcrumbs breadcrumbs={[]} />
      <div className="flex">
        <div className="flex w-full justify-center px-8 lg:w-8/12 2xl:w-9/12">
          <div className="w-full 2xl:w-10/12">
            <div className="mb-8 flex flex-col 2xl:flex-row">
              <div className="pr-(3 relative w-full 2xl:w-7/12">
                <FeaturedPost
                  post={posts.filter((post) => post.is_feature === true)?.[0]}
                />
              </div>
              <div className="relative hidden w-full 2xl:flex 2xl:w-5/12 2xl:flex-col ">
                {posts
                  .filter((post) => post.is_sub_feature === true)
                  .map((post) => {
                    return <SubFeaturedPost key={post.title} post={post} />;
                  })}
              </div>
              <div className="relative mt-8 flex w-full flex-col 2xl:hidden 2xl:w-5/12">
                {posts
                  .filter((post) => post.is_sub_feature === true)
                  .map((post) => {
                    return <StandarPost key={post.title} post={post} />;
                  })}
              </div>
            </div>
            <div className="my-8 flex flex-col">
              <div className="relative w-full ">
                {posts
                  .filter(
                    (post) =>
                      post.is_feature !== true && post.is_sub_feature !== true,
                  )
                  .map((post) => {
                    return <StandarPost key={post.title} post={post} />;
                  })}
              </div>
            </div>
            <div className="my-8 w-full">
              <div className="mb-4 w-full">
                <h1 className={clsx(lato.className, 'mb-2 text-3xl font-bold')}>
                  Your source for the latest trends and innovations across the
                  tiny homes landscape.
                </h1>
                <h1 className={clsx(lato.className, 'text-1xl mb-4 font-bold')}>
                  Sign up today to start engaging with the Tiny Homes LTD.
                  community and start making you personal tiny home journey a
                  reality.
                </h1>
                <Link href="/login" className="mt-4">
                  <Button className="mt-4 ">
                    Get Started
                    <UserPlusIcon className="ml-4 h-5 w-5 text-gray-50" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          {/* <div className={styles.shape} /> */}
          {/* <div className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent" /> */}
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to Tiny Homes LTD.</strong>
          </p>
          <p
            className={`${inter.className} text-xl text-gray-800 md:leading-normal`}
          >
            Your source for tiny home news and the latest design trends.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-desktop.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
      </div>
    </main>
  );
}
