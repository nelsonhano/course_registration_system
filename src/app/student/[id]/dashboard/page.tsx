import StudentInfoComp from '@/components/StudentInfoComp';
import { SearchParamProps } from '@/lib/actions/type'

export default async function Page({ params }: SearchParamProps) {
  const studentId = params.id;

  return (
    <main>
      <div className='mx-auto items-center w-5/6 h-[585px] overflow-hidden space-y-3'>
        <StudentInfoComp studentId={studentId} />
      </div>
    </main>
  );
}
