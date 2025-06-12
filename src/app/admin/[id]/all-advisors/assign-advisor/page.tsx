import AdminHeaderComponent from '@/components/AdminHeaderComponent';
import { getAllAdvisor } from '@/lib/actions/user.actions';
import SelectAdvicor from '@/components/SelectAdvicor';
import { SearchParamProps } from '@/lib/actions/type';

export default async function page({params}:SearchParamProps) {
  const advisorsData = await getAllAdvisor()

  const advisors = (advisorsData || []).map((doc) => ({
    fullName: doc.fullName,
  }));
  
  return (
    <>
      <div className='mx-auto items-center w-5/6 h-[585px] overflow-hidden'>
        <AdminHeaderComponent 
          title='Assign New Advisors'
          text='Assign academic advisors to specific departments and levels to manage student course approvals.'
        />

        <SelectAdvicor params={params.id} advisors={advisors}/>
      </div>
    </>
  )
}
