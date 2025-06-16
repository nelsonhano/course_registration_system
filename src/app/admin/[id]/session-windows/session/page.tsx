import AdminHeaderComponent from '@/components/AdminHeaderComponent'
import ViewSession from '@/components/ViewSession'
import { SearchParamProps } from '@/lib/actions/type'

export default function page({params}:SearchParamProps) {
  const id = params.id;
  return (
    <>
      <div className='mx-auto items-center w-5/6'>
        <AdminHeaderComponent 
          title='Registration Windows'
          text='Create academic sessions, semesters, and control when course registration is open or closed.'
        />

        <div className='flex gap-10 flex-col my-7 md:flex-row relative'>
          <div className='flex gap-2 relative flex-col'>
            <p className='capitalize font-serif text-gray-700 font-bold'>current session</p>
            <h3 className='font-bold text-3xl'>2025/26</h3>
          </div>
          <div className='flex gap-2 relative flex-col'>
            <p className='capitalize font-serif text-gray-700 font-bold'>current semester</p>
            <h3 className='capitalize font-bold text-3xl'>second semester</h3>
          </div>
        </div>

        <hr className="border-none h-px bg-black/10" />

        <ViewSession id={id} />
      </div>
    </>
  )
}
