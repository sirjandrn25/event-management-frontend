import { DictionaryType } from "@/types/common.type";
import { ObjectUtils } from "@/utils/object.utils";
import { SelectBoxOptionType, SelectBoxValueType } from "./select-box.type";

interface ParseToSelectBoxOptionProps<TData> {
  data: TData[];
  valueKey: string;
  labelKey: string;
  subLabelKey: string;
  subLabelPrefixKey?: string;
  // disabled?:boolean,
  // enabled?:boolean
  defaultVisibleKey?: string;
  visibleKeys?: string[];
  discardVisibleCondition?: boolean;
  discardVisibleValue?: SelectBoxValueType;
}

export const ParseToSelectBoxOption = <TData extends DictionaryType>({
  data,
  valueKey,
  labelKey,
  defaultVisibleKey,
  subLabelKey,
  discardVisibleCondition,
  visibleKeys,
  discardVisibleValue,
}: ParseToSelectBoxOptionProps<TData>) => {
  const hasVisibleOption = (option: SelectBoxOptionType) => {
    if (discardVisibleValue === option?.value) return true;
    if (visibleKeys?.length)
      visibleKeys.every((visibleKey) => !!option?.data?.[visibleKey]);
    return option?.data?.[defaultVisibleKey ?? "active"] !== false;
  };

  const parseOptions = data.map((el) => {
    return {
      label: ObjectUtils.accessNestedValue(el, labelKey),
      value: ObjectUtils.accessNestedValue(el, valueKey),
      data: el,
      subLabel: ObjectUtils.accessNestedValue(el, subLabelKey),
    };
  });
  if (discardVisibleCondition) return parseOptions;
  return parseOptions?.filter((option) => hasVisibleOption(option));
};
