import AdminHeaderComponent from "@/components/AdminHeaderComponent";
import UploadCourseComponent from "@/components/UploadCourseComponent";
import { SearchParamProps } from "@/lib/actions/type";

export default function page({params}:SearchParamProps) {
  const id = params.id;

  return (
    <>
      <div className='mx-auto items-center w-5/6 '>
        <AdminHeaderComponent 
          title='Course Management'
          text="Add, edit, or upload course lists for each department and semester."
        />

        <UploadCourseComponent userId={id} />
      </div>
    </>
  )
}
