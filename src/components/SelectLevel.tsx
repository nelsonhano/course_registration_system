'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { levels } from "@/lib/constants";
  
type Props = {
  placeholder: string,
  value: string,
  field: any,
};
export default function SelectLevel({ placeholder, value, field }: Props) {
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
        {levels.map((eachLevel, index) => {
          return (
            <SelectItem key={index} value={eachLevel}>
              {eachLevel}
            </SelectItem>
          );
        })}

      </SelectContent>
    </Select>

  )
}
