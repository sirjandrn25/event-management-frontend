import { useUncontrolled } from "@/hooks/core/use-uncontrolled.hook";
import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { SelectInputProps, SelectValueType } from "./select-input.type";

const SelectInput = ({
  value: valueProps,
  defaultValue,
  onChange,
  options,
  className,
  placeholder,
}: SelectInputProps<SelectValueType>) => {
  const [value, onValueChange] = useUncontrolled({
    value: valueProps,
    defaultValue,
    onChange,
  });
  const displayValue = useMemo(() => {
    return options.find((option) => option?.value === value)?.label;
  }, [options, value]);
  const displayPlaceholder = (
    <span className="text-sm font-medium text-muted-foreground">
      {placeholder ?? "Select Options"}
    </span>
  );

  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue as string}
      value={value as string}
    >
      <SelectTrigger className={className}>
        {displayValue ? (
          <SelectValue>{displayValue}</SelectValue>
        ) : (
          displayPlaceholder
        )}
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option?.value as string} key={option?.value}>
            {option?.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectInput;
