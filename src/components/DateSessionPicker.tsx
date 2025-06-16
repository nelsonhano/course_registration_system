"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SessionPickerProps {
    field: {
        value: string
        onChange: (value: string) => void
    }
}

export function DateSessionPicker({ field }: SessionPickerProps) {
    const [open, setOpen] = React.useState(false)

    const currentYear = new Date().getFullYear()
    const startYear = currentYear
    const endYear = currentYear + 20 // generates 20 options
    const sessionYears = Array.from({ length: endYear - startYear }, (_, i) => {
        const year1 = startYear + i
        const year2 = (year1 + 1).toString().slice(2)
        return `${year1}/${year2}`
    })

    return (
        <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="session"
                        className="w-full justify-between font-normal"
                    >
                        {field.value || "Select session"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <ScrollArea className="h-[200px]">
                        <ul className="p-2 space-y-1">
                            {sessionYears.map((session) => (
                                <li key={session}>
                                    <button
                                        onClick={() => {
                                            field.onChange(session)
                                            setOpen(false)
                                        }}
                                        className={`w-full text-left px-3 py-1.5 rounded hover:bg-gray-100 ${field.value === session ? "bg-gray-100 font-medium" : ""
                                            }`}
                                    >
                                        {session}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </div>
    )
}
