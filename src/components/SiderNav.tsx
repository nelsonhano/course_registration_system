"use client";

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { adminNavItems } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface Props {
  fullName: string;
  email: string;
  avatar: string;
}

export default function SiderNav( { adminId }: { adminId: string }) {
  console.log(adminId);
  
  const navItems = adminNavItems(adminId)
  const pathname = usePathname();
  return (
    <aside
      className='remove-scrollbar justify-between py-10 hidden h-screen w-[90px] flex-col overflow-hidden px-5 sm:flex lg:w-[280px] xl:w-[325px]'
    >
    
    <nav>
      <ul 
        className="flex flex-1 flex-col"
      >
          {navItems.map(({ url, icon, name }) => (
            <Link href={url} key={url} className="lg:w-full gap-y-10">
              <li
                className={cn(
                  "flex lg:w-full justify-center gap-2 lg:justify-start items-center rounded-4xl h5 lg:px-[30px] h-[52px]",
                  pathname === url && "bg-[#e8e6ee]",
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    "w-6 filter invert opacity-25",
                    pathname === url && "invert-0 opacity-100",
                  )}
                />
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
      </ul>
    </nav>

    <Button
      className='cursor-pointer bg-white text-blue-700 font-bold'
    >
      Log out
    </Button>
    </aside>
  )
}
