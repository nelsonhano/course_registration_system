"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { adminNavItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav({ adminId }: { adminId: string }) {
    const pathname = usePathname();

    const navItems =  adminNavItems(adminId)
return (
    <Sheet>
        <SheetTrigger className="sm:hidden">
            <Image
                src='/assets/icons/menu.svg'
                alt='menu'
                width={22}
                height={22}
                className="bg-[#e8e6ee] mt-2 ml-2"
            />
        </SheetTrigger>
        <SheetContent>
        <>
            <ul
                className="flex flex-1 flex-col mt-10"
            >
                    {navItems.map(({ url, icon, name }) => (
                    <Link href={url} key={url} className="lg:w-full">
                        <li
                            className={cn(
                                "flex bg-blue-700 lg:w-full justify-center gap-2 lg:justify-start items-center h5 lg:px-[30px] h-[52px]",
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
                            {/* <p className="hidden lg:block">{name}</p> */}
                        </li>
                    </Link>
                ))}
            </ul>
        </>
        </SheetContent>
    </Sheet>
)
}
