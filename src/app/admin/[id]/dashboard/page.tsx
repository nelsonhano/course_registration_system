import AdminStudentTable from '@/components/AdminStudentTable';
import AdminHeadDetail from '@/components/AdminHeadDetail';
import { getAdminById, getAllStudents } from '@/lib/actions/user.actions';
import { SearchParamProps } from '@/lib/actions/type';

export default async function page({params}:SearchParamProps) {
  const {id} = params;
  const admin = await getAdminById({id})
  const student = await getAllStudents()
  
  console.log("admin" + admin);
  console.log("student" + student);
  return (
    <>
      <div className='mx-auto items-center w-5/6'>
        <AdminHeadDetail 
          name={admin.fullName}
          img={admin.avatar}
          title='Manage Student'
          text='View, add, edit, and manage student records across all department.'
        />

        <AdminStudentTable students={student} />
      </div>
    </>
  )
}
