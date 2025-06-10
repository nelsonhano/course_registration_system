import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { status } from '@/lib/constants';

type Props = {
    placeholder: string;
    field: any;
    value: string;
}
export default function Status({ placeholder, field, value }: Props) {
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
            {status.map((eachLevel, index) => {
                return (
                    <SelectItem key={index} value={eachLevel}>
                        {eachLevel}
                    </SelectItem>
                );
            })}

        </SelectContent>
    </Select>
)}
