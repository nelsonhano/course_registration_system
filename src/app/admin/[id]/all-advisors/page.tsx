import AdminHeaderComponent from '@/components/AdminHeaderComponent';
import { getAllAssigAdvisor } from '@/lib/actions/user.actions';
import AllAdisorComponent from '@/components/AllAdisorComponent';
import { SearchParamProps } from '@/lib/actions/type';

export default async function page({params}:SearchParamProps) {
  const advisorsData = await getAllAssigAdvisor()

  const advisors = (advisorsData || []).map((doc) => ({
    advisor: doc.selectAdvicor,
    level: doc.selectLevel,
    department: doc.selectDepartment,
  }));
  
  // console.log({advisors})
  return (
    <>
      <div className='mx-auto items-center w-5/6 h-[585px] overflow-hidden space-y-3'>
        <AdminHeaderComponent 
          title='Assign New Advisors'
          text='Assign academic advisors to specific departments and levels to manage student course approvals.'
        />

        <h2 className='md:text-3xl text-xl text-blue-700'>Current Advisors</h2>
        
        <AllAdisorComponent params={params} advisors={advisors} />  
      </div>
    </>
  )
}
