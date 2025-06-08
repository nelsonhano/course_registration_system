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
};
export default function SelectSemester({ placeholder, value, field }: Props) {
  return (
    <Select
      onValueChange={field.onChange}
      defaultValue={field.value}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="first semester">First Semester</SelectItem>
        <SelectItem value="second semester">Second Semester</SelectItem>
      </SelectContent>
    </Select>

  )
}
