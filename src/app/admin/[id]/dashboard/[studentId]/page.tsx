import EditStudentInfo from "@/components/EditStudentInfo";

export default async function page({ params }: { params: { adminId: string; studentId: string } }) {
    const { studentId, adminId } = params;
    
return (
    <EditStudentInfo studentId={studentId} adminId={adminId}/>
)
}
