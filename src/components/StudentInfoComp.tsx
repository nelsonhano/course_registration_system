import { getCloseRegDate, getStudentById } from "@/lib/actions/user.actions";
import StatusComponent from "./StatusComponent";
import { formatDateToDDMonthYYYY, getCountdown } from "@/lib/utils";
import Image from "next/image";

// { days }d { hours }hrs { minutes }mins { seconds } secs

export default async function StudentInfoComp({ studentId }: { studentId: string }) {
    const patient = await getStudentById({ studentId });
    const regCloseDate = await getCloseRegDate();
    const { days, hours, minutes, seconds } = getCountdown(regCloseDate);
    const date = formatDateToDDMonthYYYY(regCloseDate);
    
    const status = patient?.status;
return (
    <div className="flex flex-col pl-2 mt-10 gap-2">
        <div className="flex justify-between">
            <div className="flex flex-col">
                <h1 className="capitalize text-4xl font-bold">Hello, <span className="text-blue-600">{patient?.fullName}</span></h1>
                <p className="capitalize flex gap-2 text-2xl font-bold">Registration Status: <StatusComponent status={status} /></p>
                <p>Regisstration closes by <span className="text-red-600">{date}</span></p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <Image 
                    src={patient?.avatar}
                    width={60}
                    height={60}
                    alt="avatar"
                    className="flex border object-cover p-auto pt-2 border-blue-700"
                />
                <div className="font-bold">{patient?.matricNumber}</div>
                <div>{patient?.level} level</div>
            </div>
        </div>
        <hr className="border-none h-px bg-black/10" />
    </div>
);
}
