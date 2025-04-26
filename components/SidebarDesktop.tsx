'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { cn } from '@/lib/utils'; // Se hai una funzione cn per gestire le classi dinamiche, altrimenti uso normale `${}`

const links = [
  { href: '/', label: 'Overview', icon: '/assets/images/icon-nav-overview.svg' },
  { href: '/transactions', label: 'Transactions', icon: '/assets/images/icon-nav-transactions.svg' },
  { href: '/budgets', label: 'Budgets', icon: '/assets/images/icon-nav-budgets.svg' },
  { href: '/pots', label: 'Pots', icon: '/assets/images/icon-nav-pots.svg' },
  { href: '/recurring-bills', label: 'Recurring Bills', icon: '/assets/images/icon-nav-recurring-bills.svg' },
];

export default function SidebarDesktop() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:h-screen bg-Grey900 text-white p-6 pl-0 fixed rounded-r-2xl">
      <div className="mb-8">
        <img className='pl-6' src="/assets/images/logo-large.svg" alt="" />
      </div>
      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className="group">
              <div
                className={`flex items-center gap-4 border-l-4 p-3 rounded-l-none rounded-xl ${
                  isActive ? 'bg-Beige100 text-Grey900' : 'hover:bg-Grey500'
                } ${isActive ? 'border-Green' : 'border-transparent'}
                `}
              >
                <img className={`text-2xl ${isActive ? 'filter-green' : ''}`} src={link.icon} />
                <span className="text-base font-semibold">{link.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-6 pl-6">
        <button className="flex items-center gap-2 text-Grey300 hover:text-white text-sm">
          <img src="/assets/images/icon-minimize-menu.svg" alt="" />
          Minimize Menu
        </button>
      </div>
    </aside>
  );
}