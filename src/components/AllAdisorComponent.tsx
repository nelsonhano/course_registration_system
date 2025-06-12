import { SearchParamProps } from "@/lib/actions/type";
import { Button } from "./ui/button";
import Link from "next/link";
import AllAdvisorTable from "./AllAdvisorTable";

interface Advisor {
    advisor: string;
    department: string;
    level: 100 | 200 | 300 | 400 | 500;
    
};

interface AllAdvisorProps {
  advisors: Advisor[];
  params: SearchParamProps["params"];
}

export default function AllAdisorComponent({ advisors, params }: AllAdvisorProps) { 
  return (
    <div className="flex relative flex-col">
      <AllAdvisorTable advisors={advisors} />

      <Button asChild className="bg-blue-600 mx-auto flex w-2/4 md:w-1/3 mt-10">
        <Link href={`/admin/${params.id}/all-advisors/assign-advisor`}>
          Assign New Advisor
        </Link>
      </Button>
    </div>
  )
}
