import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import SidebarDesktop from '@/components/SidebarDesktop';
import BottomNavbar from '@/components/BottomNavbar'
import DashboardProvider from '@/context/DashboardProvider';
import SafeHydrate from '@/components/SafeHydrate';

const PublicSans = localFont({
  src: './PublicSans-VariableFont_wght.ttf',
})

export const metadata: Metadata = {
  title: 'Finance Dashboard',
  description: 'Personal finance tracker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${PublicSans.className} bg-Grey100 min-h-screen text-Grey900`}>
        <SidebarDesktop />
        <SafeHydrate>
          <DashboardProvider>
            <div className="lg:ml-64 pb-16 lg:pb-0">
              <main className="p-4 lg:pt-8 sm:p-6 lg:p-10">{children}</main>
            </div>
          </DashboardProvider>
        </SafeHydrate>
        <BottomNavbar />
      </body>
    </html>
  );
}