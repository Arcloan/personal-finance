'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Overview', icon: '/assets/images/icon-nav-overview.svg' },
  { href: '/transactions', label: 'Transactions', icon: '/assets/images/icon-nav-transactions.svg' },
  { href: '/budgets', label: 'Budgets', icon: '/assets/images/icon-nav-budgets.svg' },
  { href: '/pots', label: 'Pots', icon: '/assets/images/icon-nav-pots.svg' },
  { href: '/recurring-bills', label: 'Recurring Bills', icon: '/assets/images/icon-nav-recurring-bills.svg' },
];

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-Grey900 pb-0 rounded-b-none text-white p-2 flex justify-around items-center rounded-t-2xl lg:hidden">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link key={link.href} href={link.href} className="flex flex-col items-center justify-center text-xs">
            <div
              className={`flex flex-col items-center p-2 rounded-b-none rounded-xl ${
                isActive ? 'bg-Beige100 text-Grey900 border-b-6 border-Green' : 'hover:text-Grey300'
              }`}
            >
              <img className={`text-2xl ${isActive ? 'filter-green' : ''}`} src={link.icon} alt={link.label} />
              <span className="hidden md:block">{link.label}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}