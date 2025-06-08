import AdminHeaderComponent from '@/components/AdminHeaderComponent'
import BroadCastComponent from '@/components/BroadCastComponent'
import { SearchParamProps } from '@/lib/actions/type';

export default function page({params}:SearchParamProps) {
  return (
    <>
      <div className='mx-auto items-center w-5/6'>
        <AdminHeaderComponent 
          title='Broadcast Announcement'
          text='Send messages to all users about system maintenance, deadlines, or updates.'
        />

        <BroadCastComponent />
      </div>
    </>
  )
}
