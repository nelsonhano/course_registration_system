import AdminHeaderComponent from '@/components/AdminHeaderComponent'
import CreateSession from '@/components/CreateSession'
import { SearchParamProps } from '@/lib/actions/type'

export default async function page({params}:SearchParamProps) {
  const id = await params.id;
  return (
    <>
      <div className='mx-auto items-center w-5/6'>
        <AdminHeaderComponent 
          title='Registration Windows'
          text='Create academic sessions, semesters, and control when course registration is open or closed.'
        />

        <CreateSession id={id} />
      </div>
    </>
  )
}
