import { DictionaryType } from "@/types/common.type";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

export const SelectBoxVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);
export type SelectBoxValueType = string | number;
export type SelectBoxOptionType = {
  value: string | number;
  label: string;
  subLabel?: string;
  data?: DictionaryType;
};
export type SuffixPrefixOptionType =
  | React.ReactNode
  | ((option: SelectBoxOptionType) => React.ReactNode);
export interface GenericSelectBoxProps<TValue>
  extends Omit<
      HTMLAttributes<HTMLDivElement>,
      | "size"
      | "translate"
      | "prefix"
      | "onKeyDown"
      | "onChange"
      | "value"
      | "defaultValue"
    >,
    VariantProps<typeof SelectBoxVariants> {
  options: SelectBoxOptionType[];
  defaultValue?: TValue;
  value?: TValue;
  className?: string;
  onChange?: (value?: TValue) => void;
  placeholder?: string;
  onOptionChange?: (option?: SelectBoxOptionType) => void;
  disabled?: boolean;
  isSearchable?: boolean;
  onSearchValue?: (value?: string) => void;
  isSearchLoading?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  searchValue?: string;
  isClearable?: boolean;
}
export type SelectBoxProps = GenericSelectBoxProps<SelectBoxValueType> & {
  prefix?: SuffixPrefixOptionType;
  suffix?: SuffixPrefixOptionType;
  onCreateNew?: () => void;
};

export interface MultiSelectBoxProps
  extends Omit<GenericSelectBoxProps<SelectBoxValueType[]>, "onOptionChange"> {
  onOptionChange?: (option?: SelectBoxOptionType[]) => void;
  displayLimit?: number;
  suffix?: SuffixPrefixOptionType;
}
