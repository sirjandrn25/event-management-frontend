import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import AutoFormLabel from "../common/auto-form-label";
import AutoFormTooltip from "../common/auto-form-tooltip";
import { AutoFormInputComponentProps } from "../types";
import SelectInput from "@/components/ui/selectInput/select.input";

export default function AutoFormSelect({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  return (
    <FormItem>
      <AutoFormLabel label={label} isRequired={isRequired} />
      <FormControl>
        <SelectInput
          options={fieldProps?.options || []}
          onChange={field?.onChange}
          value={field?.value}
        />
      </FormControl>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
