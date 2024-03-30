import { HomeModernIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image src={'/Logo.png'} alt="logo" width={300} height={200} />
      {/* <HomeModernIcon className="h-12 w-12" />
      <p className="text-[44px]">Tiny Homes LTD.</p> */}
    </div>
  );
}
