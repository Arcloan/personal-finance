'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Overview', icon: '/assets/images/icon-nav-overview.svg' },
  { href: '/transactions', label: 'Transactions', icon: '/assets/images/icon-nav-transactions.svg' },
  { href: '/budgets', label: 'Budgets', icon: '/assets/images/icon-nav-budgets.svg' },
  { href: '/pots', label: 'Pots', icon: '/assets/images/icon-nav-pots.svg' },
  { href: '/recurring-bills', label: 'Recurring Bills', icon: '/assets/images/icon-nav-recurring-bills.svg' },
];

export default function SidebarDesktop() {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(prev => !prev);
  };

  return (
    <aside className={`hidden lg:grid lg:grid-rows-[min-content_auto_auto] ${isMinimized ? 'lg:w-20' : 'lg:w-64'} lg:h-screen bg-Grey900 text-white p-4 pl-0 fixed rounded-r-2xl transition-all duration-300 items-center ${isMinimized ? 'p-2' : 'p-4'}`}>
      <div className={`mb-12 mt-6 flex justify-center pl-4 ${isMinimized ? "justify-self-center" : "justify-self-start"} `} >
        {!isMinimized && <img src="/assets/images/logo-large.svg" alt="" />}
        {isMinimized && <img src="/assets/images/logo-small.svg" />}
      </div>
      <nav className={`flex flex-col ${isMinimized ? 'gap-6' : 'gap-2'} ${isMinimized ? 'm-auto' : 'self-start'} items-center w-full`}>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className="group w-full">
              <div
                className={`flex ${isMinimized ? 'flex-col justify-center' : 'flex-row'} border-l-4 items-center ${isMinimized ? 'gap-1' : 'gap-4'} p-3 rounded-l-none rounded-xl w-full ${
                  isActive ? 'bg-Beige100 text-Grey900' : 'hover:bg-Grey500'
                  
                } ${isActive ? 'border-Green' : 'border-transparent'}`}
              >
                <img className={`text-2xl ${isActive ? 'filter-green' : ''}`} src={link.icon} />
                {!isMinimized && <span className="text-base font-semibold">{link.label}</span>}
              </div>
            </Link>
          );
        })}
      </nav>
      <div className={`mt-auto pt-6 pb-8 ${isMinimized ? "justify-self-center" : "justify-self-start"} `}>
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-2 text-grey-300 pl-4 hover:text-white text-sm cursor-pointer"
        >
        {isMinimized ? <img src={"/assets/images/icon-minimize-menu.svg"} className='rotate-y-180' /> : <p className={`flex gap-2 ${isMinimized ? "justify-self-center" : "justify-self-start"}`}><img src="/assets/images/icon-minimize-menu.svg" alt="" /> Minimize Menu</p>}
        </button>
      </div>
    </aside>
  );
}