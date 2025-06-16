import { cn } from "@/lib/utils";

type StatusProps = {
    status: "inactive"|"active"
};
export default function StatusComponent({ status }: StatusProps) {
return (
    <div className={cn(status === "inactive" ? "text-red-700": "text-green-700")}>
        {status === "inactive" ? "Not Approved": "Approved"}
    </div>
);
};
