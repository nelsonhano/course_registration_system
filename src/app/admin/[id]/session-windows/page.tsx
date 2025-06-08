import AdminHeaderComponent from '@/components/AdminHeaderComponent'
import CreateSession from '@/components/CreateSession'
import { SearchParamProps } from '@/lib/actions/type'

export default function page({params}:SearchParamProps) {
  return (
    <>
      <div className='mx-auto items-center w-5/6'>
        <AdminHeaderComponent 
          title='Registration Windows'
          text='Create academic sessions, semesters, and control when course registration is open or closed.'
        />

        <CreateSession />
      </div>
    </>
  )
}
