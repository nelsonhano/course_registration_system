import { SearchParamProps } from '@/lib/actions/type'
import { getStudentById } from '@/lib/actions/user.actions';

export default async function Page({ params }: SearchParamProps) {
  const {id} = params;
  const patient = await getStudentById({id})

  return (
    <div>
      Admin - ID: {id}
    </div>
  );
}
