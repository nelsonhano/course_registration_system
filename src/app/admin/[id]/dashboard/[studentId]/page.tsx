import EditStudentInfo from "@/components/EditStudentInfo";
import { getStudentById } from "@/lib/actions/user.actions";

export default async function page({ params }: { params: { adminId: string; studentId: string } }) {
    const { studentId } = params;
    
return (
    <EditStudentInfo studentId={studentId} />
)
}
