import Image from 'next/image'
import React from 'react'

type Props = {
    img?: string,
    name: string,
    text: string,
    title: string,
    date?: string,
}

export default function AdminHeadDetail({ img, name, text, date, title }: Props) {
    return (
        <div className='w-full mt-10 pl-2'>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-5xl">
                        Hello, <span className='text-blue-700'>{name ? name : "Dr. Afolabi"}</span>
                    </h1>
                </div>
                <div>
                    {img && (
                        <Image
                            src={img}
                            width={60}
                            height={60}
                            alt='logo'
                            className="rounded-full"
                        />
                    )}
                </div>
            </div>
            <div className='flex flex-col text-gray-700'>
                <p className='text-2xl'>{title}</p>
                <p >{text}</p>
            </div>
        </div>
    );
}
