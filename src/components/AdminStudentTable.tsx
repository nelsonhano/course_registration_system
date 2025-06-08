import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Student } from "@/lib/actions/type";
import StudentDetail from "./StudentDetail";

type AdminStudentTableProps = {
    students: Student[];
};

export default function AdminStudentTable({ students }: AdminStudentTableProps) {

return (
    <Table>
        <TableHeader>
            <TableRow className="bg-gray-100 rounded-4xl">
                <TableHead className="w-[300px]">Student Name</TableHead>
                <TableHead>Matric No</TableHead>
                <TableHead>Deprtment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Detail</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {students.map((student)=> (
                <TableRow key={student.id}>
                    <TableCell>{student.fullName}</TableCell>
                    <TableCell>{student.matricNumber}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell><StudentDetail /></TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
)};
