'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Props = {
    placeholder: string,
    value: string,
    field: any,
    advisors: {
        fullName: string
    }[]
};
export default function SelectAdvisorField({ advisors, placeholder, value, field }: Props) {
    return (
        <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={value || ""}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {advisors.map((eachLevel, index) => {
                    return (
                        <SelectItem key={index} value={eachLevel.fullName}>
                            {eachLevel.fullName}
                        </SelectItem>
                    );
                })}

            </SelectContent>
        </Select>

    )
}
