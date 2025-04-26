'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Overview', icon: '🏠' },
  { href: '/transactions', label: 'Transactions', icon: '⇅' },
  { href: '/budgets', label: 'Budgets', icon: '📊' },
  { href: '/pots', label: 'Pots', icon: '💰' },
  { href: '/recurring-bills', label: 'Recurring Bills', icon: '📄' },
];

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-grey-900 text-white p-2 flex justify-around items-center rounded-t-2xl lg:hidden">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link key={link.href} href={link.href} className="flex flex-col items-center justify-center text-xs">
            <div
              className={`flex flex-col items-center p-2 rounded-xl ${
                isActive ? 'bg-beige-100 text-grey-900 border-t-4 border-green' : 'hover:text-grey-300'
              }`}
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="hidden md:block">{link.label}</span> {/* Testo visibile solo da tablet in su */}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}