// import { Card } from '@/app/ui/dashboard/cards';
import CardWrapper from '@/app/ui/my_dashboard/cards';
import RevenueChart from '@/app/ui/my_dashboard/revenue-chart';
import MyStudies from '@/app/ui/my_dashboard/my-studies';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import {
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';
import { Metadata } from 'next';
import MyLatestResponses from '@/app/ui/my_dashboard/my-latest-responses';
import { auth } from '@/auth';
import Image from 'next/image';
import jonSnow from '../../../../public/athletes/a5b41d8f-6cfa-4a36-b61b-f45f4d01e916.webp';
import Daenerys from '../../../../public/athletes/fd30a157-963b-434f-a97f-4cdf532a1112.webp';
import Cedric from '../../../../public/athletes/aef55288-40c9-4c98-9f3b-abc05ffa007f.webp';
import ladyElara from '../../../../public/athletes/3d4c632c-3116-40a6-89c2-53a0288581c2.webp';

export const metadata: Metadata = {
  title: 'My Dashboard',
};

export default async function Page() {
  const session = await auth();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        My Dashboard
      </h1>
      {/* <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
        <div className="bg-white p-6">
          <p>Hi {session?.user?.name?.split(' ')[0]},</p>

          <p className="mt-4">
            Thank you for joining us at Take Your Pick, a collaborative
            initiative aimed at enhancing the scouting process through a blend
            of research and technology. This platform is a tool for you—the
            sports professional—to refine and expand your scouting capabilities
            in an innovative environment.
          </p>
          <p className="mt-4">
            At Take Your Pick, your expertise and judgment are valued. As you
            navigate through athlete profiles, your interactions help shape a
            personalized scouting profile. Our AI technology is designed to
            learn how you identify success and complement your scouting style
            with deep statistical insights and personalized guidence.
          </p>
          <p className="mt-4">
            Your active participation will not only assist in honing your own
            scouting skills but also contribute to valuable research in athlete
            evaluation, sport psychology, and scouting methodologies.
          </p>

          <p className="mt-4">
            Thank you for your commitment to excellence and innovation in the
            world of sports scouting.
          </p>
          <p className="mt-4">- TYP</p>
        </div>
      </div> */}
      <h2 className={`${lusitana.className} mb-4 mt-6 text-xl md:text-2xl`}>
        {`Your latest athletes`}
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
        <Suspense fallback={<CardsSkeleton />}>
          <div className="rounded-xl bg-gray-50 p-8 shadow-sm">
            <div className="grid gap-6 sm:grid-cols-4 lg:grid-cols-4">
              <div className=" grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
                <div className="xs:grid-cols-1 relative h-56 overflow-hidden rounded-lg">
                  <Image src={jonSnow} alt=" random imgee" />
                </div>

                <div className="relative -mt-16 px-4">
                  <div className="rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex items-baseline">
                      <span className="inline-block rounded-full bg-teal-200 px-2 text-xs font-semibold  uppercase tracking-wide text-teal-800">
                        New
                      </span>
                      <div className="ml-2 text-xs font-semibold tracking-wider text-gray-600">
                        OHL &bull; Center
                      </div>
                    </div>

                    <h4 className="mt-1 truncate text-xl font-semibold leading-tight">
                      John Snow
                    </h4>
                  </div>
                </div>
              </div>
              <div className=" grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
                <div className="xs:grid-cols-1 relative h-56 overflow-hidden rounded-lg">
                  <Image src={Cedric} alt=" random imgee" />
                </div>

                <div className="relative -mt-16 px-4">
                  <div className="rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex items-baseline">
                      <span className="inline-block rounded-full bg-teal-200 px-2 text-xs font-semibold  uppercase tracking-wide text-teal-800">
                        New
                      </span>
                      <div className="ml-2 text-xs font-semibold tracking-wider text-gray-600">
                        OHL &bull; Center
                      </div>
                    </div>

                    <h4 className="mt-1 truncate text-xl font-semibold leading-tight">
                      Sir Cedric
                    </h4>
                  </div>
                </div>
              </div>
              <div className=" grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
                <div className="xs:grid-cols-1 relative h-56 overflow-hidden rounded-lg">
                  <Image src={Daenerys} alt=" random imgee" />
                </div>

                <div className="relative -mt-16 px-4">
                  <div className="rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex items-baseline">
                      <span className="inline-block rounded-full bg-teal-200 px-2 text-xs font-semibold  uppercase tracking-wide text-teal-800">
                        New
                      </span>
                      <div className="ml-2 text-xs font-semibold tracking-wider text-gray-600">
                        CHL &bull; Center
                      </div>
                    </div>

                    <h4 className="mt-1 truncate text-xl font-semibold leading-tight">
                      Daenerys Cork
                    </h4>
                  </div>
                </div>
              </div>
              <div className=" grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
                <div className="xs:grid-cols-1 relative h-56 overflow-hidden rounded-lg">
                  <Image src={ladyElara} alt=" random imgee" />
                </div>

                <div className="relative -mt-16 px-4">
                  <div className="rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex items-baseline">
                      <div className=" text-xs font-semibold tracking-wider text-gray-600">
                        AHL &bull; Center
                      </div>
                    </div>

                    <h4 className="mt-1 truncate text-xl font-semibold leading-tight">
                      Lady Elara
                    </h4>
                    {/* <div className="mt-2">
                      <span className="text-sm text-gray-600 ">
                        {`Review Athlete ->`}
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <div className=" grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
                <div className="xs:grid-cols-1 relative h-48 overflow-hidden rounded-lg">
                  <Image
                    src="https://source.unsplash.com/random/300x450"
                    alt=" random imgee"
                    fill={true}
                    // width={300}
                    // height={450}
                  />
                </div>

                <div className="relative -mt-16 px-4  ">
                  <div className="rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex items-baseline">
                      <span className="inline-block rounded-full bg-teal-200 px-2 text-xs font-semibold  uppercase tracking-wide text-teal-800">
                        New
                      </span>
                      <div className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
                        2 baths &bull; 3 rooms
                      </div>
                    </div>

                    <h4 className="mt-1 truncate text-xl font-semibold uppercase leading-tight">
                      A random Title
                    </h4>

                    <div className="mt-1">
                      $1800
                      <span className="text-sm text-gray-600"> /wk</span>
                    </div>
                    <div className="mt-4">
                      <span className="text-md font-semibold text-teal-600">
                        4/5 ratings{' '}
                      </span>
                      <span className="text-sm text-gray-600">
                        (based on 234 ratings)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
                <div className="xs:grid-cols-1 relative h-48 overflow-hidden rounded-lg">
                  <Image
                    src="https://source.unsplash.com/random/300x450"
                    alt=" random imgee"
                    fill={true}
                    // width={300}
                    // height={450}
                  />
                </div>

                <div className="relative -mt-16 px-4  ">
                  <div className="rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex items-baseline">
                      <span className="inline-block rounded-full bg-teal-200 px-2 text-xs font-semibold  uppercase tracking-wide text-teal-800">
                        New
                      </span>
                      <div className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
                        2 baths &bull; 3 rooms
                      </div>
                    </div>

                    <h4 className="mt-1 truncate text-xl font-semibold uppercase leading-tight">
                      A random Title
                    </h4>

                    <div className="mt-1">
                      $1800
                      <span className="text-sm text-gray-600"> /wk</span>
                    </div>
                    <div className="mt-4">
                      <span className="text-md font-semibold text-teal-600">
                        4/5 ratings{' '}
                      </span>
                      <span className="text-sm text-gray-600">
                        (based on 234 ratings)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
                <div className="xs:grid-cols-1 relative h-48 overflow-hidden rounded-lg">
                  <Image
                    src="https://source.unsplash.com/random/300x450"
                    alt=" random imgee"
                    fill={true}
                    // width={300}
                    // height={450}
                  />
                </div>

                <div className="relative -mt-16 px-4  ">
                  <div className="rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex items-baseline">
                      <span className="inline-block rounded-full bg-teal-200 px-2 text-xs font-semibold  uppercase tracking-wide text-teal-800">
                        New
                      </span>
                      <div className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
                        2 baths &bull; 3 rooms
                      </div>
                    </div>

                    <h4 className="mt-1 truncate text-xl font-semibold uppercase leading-tight">
                      A random Title
                    </h4>

                    <div className="mt-1">
                      $1800
                      <span className="text-sm text-gray-600"> /wk</span>
                    </div>
                    <div className="mt-4">
                      <span className="text-md font-semibold text-teal-600">
                        4/5 ratings{' '}
                      </span>
                      <span className="text-sm text-gray-600">
                        (based on 234 ratings)
                      </span>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </Suspense>
      </div>
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div> */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <MyStudies />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <MyLatestResponses />
        </Suspense>
      </div>
    </main>
  );
}
