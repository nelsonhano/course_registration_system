import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AiOutlineEdit } from "react-icons/ai";
import { Student } from "@/lib/actions/type";
import Link from "next/link";

type AdminStudentTableProps = {
    students: Student[];
    adminId: string;
};

export default function AdminStudentTable({ students, adminId }: AdminStudentTableProps) {
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
                {students.map(({fullName, id, matricNumber, department, active})=> (
                <TableRow key={id}>
                    <TableCell>{fullName}</TableCell>
                    <TableCell>{matricNumber}</TableCell>
                    <TableCell className="capitalize">{department}</TableCell>
                    <TableCell className="capitalize">{active || "active"}</TableCell>
                    <TableCell>
                        <Link href={`/admin/${adminId}/dashboard/${id}`}><AiOutlineEdit size={20}/>
                        </Link>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
)};
