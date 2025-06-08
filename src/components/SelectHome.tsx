import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

export default function SelectHome(
  { img, text, href }: 
  { img: string, text: string, href: string }
) {
  return (
    <div>
      <div className='flex px-5 md:h-72 h-72 gap-1 border-gray-500 rounded-sm border-2 flex-col w-full items-center'>
            <Image
          className='w-[200px] object-cover h-52 bg-red-500' 
              src={img}
              width={180}
              height={200}
              alt={text}
            />
          <p className='w-full text-center'>{text}</p>
          <Button asChild>
            <Link href={href} className=' w-full'>
              Continue
            </Link>
          </Button>
        </div>
    </div>
)
}
