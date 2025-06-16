import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Advisor {
  advisor: string;
  department: string;
  level: 100 | 200 | 300 | 400 | 500;
}

interface AllAdvisorTableProps {
  advisors: Advisor[];
}

export default function AllAdvisorTable({ advisors }: AllAdvisorTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Advisor</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {advisors.map((advisor, index) => (
          <TableRow key={index}>
            <TableCell>{advisor.advisor}</TableCell>
            <TableCell>{advisor.department}</TableCell>
            <TableCell>{advisor.level}</TableCell>
            <TableCell>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}