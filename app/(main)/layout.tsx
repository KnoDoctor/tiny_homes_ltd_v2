import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import SideNav from '../ui/sidenav';
import FeaturedPostsCarousel from '../ui/main/featured-posts-carousel';

export const metadata: Metadata = {
  title: {
    template: '%s | Tiny Homes LTD',
    default: 'Tiny Homes LTD | Live Small and Be Happy',
  },
  description: 'Bringing Tiny Homes To The World',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow md:overflow-y-auto ">
        <FeaturedPostsCarousel />
        {children}
      </div>
    </div>
  );
}
