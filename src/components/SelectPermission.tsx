'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { levels, permission } from "@/lib/constants";
  
type Props = {
  placeholder: string,
  value: string,
  field: any,
};
export default function SelectPermission({ placeholder, value, field }: Props) {
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
        {permission.map((each, index) => {
          return (
            <SelectItem 
              className="capitalize" 
              key={index} 
              value={each}
            >
              {each}
            </SelectItem>
          );
        })}

      </SelectContent>
    </Select>

  )
}
