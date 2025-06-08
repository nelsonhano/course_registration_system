import SelectHome from '@/components/SelectHome'
import { homeDetails } from '@/lib/constants'
import React from 'react'

export default function page() {
  return (
    <main 
      className="flex bg-[url('/assets/images/bg-img.png')] bg-cover bg-center bg-no-repeat min-h-screen items-center justify-center min-w-full"
    >
      <div className='flex flex-col gap-5 md:h-[500px] h-full bg-white mx-auto items-center rounded-xl py-5 justify-center'>
        <div className='w-8/12'>
          <h1 className='md:text-4xl text-2xl/6 text-left'>
            Hi, welcome to the Course Registration Portal👋
          </h1>
          <p className='mt-5 font-medium'>Please choose your role to continue:</p>
        </div>
        <div className='flex flex-col items-center  md:gap-30 gap-5 md:flex-row'>
          {
            homeDetails.map((detail) => (
              <SelectHome 
                img={detail.img}
                text={detail.text}
                href={detail.href}
                key={detail.text}
              />
            ))
          }
        </div>
      </div>
    </main>
  )
}
