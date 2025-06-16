import Link from "next/link";
import { Button } from "./ui/button";
import { getCreatedSession } from "@/lib/actions/user.actions";

export default async function ViewSession({ id }: { id: string }) {
    const getFirstSession = await getCreatedSession()
return (
    <div className="my-7">
        <div className="flex flex-col relative">
            <div className="flex flex-col relative gap-2">
                <div className="flex flex-row gap-2.5">
                    <div>Status:</div>
                    <div className="text-blue-700">Opened</div>
                </div>
                <div className="flex flex-row gap-2.5">
                    <div>Opens:</div>
                    <div className="text-blue-700">19 May, 2025</div>
                </div>
                <div className="flex flex-row gap-2.5">
                    <div>Closes:</div>
                    <div className="text-blue-700">15 June, 2025</div>
                </div>
            </div>
        </div>


        <div className="flex relative mt-10 flex-col md:flex-row gap-2">
            <Button asChild className="bg-red-500">
                <Link href={``}>
                    Close Registration
                </Link>
            </Button>

            <Button asChild className="bg-white text-black border border-black">
                <Link href={``}>
                    Edit Registration
                </Link>
            </Button>

            <Button asChild className="bg-white text-black border hover:bg-white hover:text-black border-black">
                <Link href={`/admin/${id}/session-windows`}>
                    Create new session
                </Link>
            </Button>
        </div>
    </div>
);
};
