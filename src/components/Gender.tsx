import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { gender } from '@/lib/constants';

type Props = {
    placeholder: string;
    value: string;
    field: any;
}
export default function Gender({ placeholder, value, field }:Props) {
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
            {gender.map((eachLevel, index) => {
                return (
                    <SelectItem key={index} value={eachLevel}>
                        {eachLevel}
                    </SelectItem>
                );
            })}

        </SelectContent>
    </Select>
)}
