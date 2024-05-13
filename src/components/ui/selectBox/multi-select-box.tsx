"use client";

import { CommandEmpty, CommandLoading } from "cmdk";
import * as React from "react";

import { CaretSortIcon, CheckIcon, Cross1Icon } from "@radix-ui/react-icons";

import { useUncontrolled } from "@/hooks/core/use-uncontrolled.hook";
import { cn } from "@/lib/utils";
import { CommonUtils } from "@/utils/common.utils";
import { Badge } from "../badge";
import { Button } from "../button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";
import {
  MultiSelectBoxProps,
  SelectBoxOptionType,
  SelectBoxValueType,
  SuffixPrefixOptionType,
} from "./select-box.type";

export const MultiSelectBox = React.forwardRef<
  HTMLDivElement,
  MultiSelectBoxProps
>(
  (
    {
      disabled,
      options,
      value: valueProps,
      defaultValue,
      className,
      onChange,
      onOptionChange,
      placeholder = "select options ...",
      isSearchable = true,
      onSearchValue,
      size,
      isSearchLoading,
      displayLimit = 1,
      suffix,
      searchValue,
      isClearable,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState<boolean>();
    const getSelectedOptions = React.useCallback(
      (value: typeof valueProps) => {
        return (value
          ?.map((value: SelectBoxValueType) =>
            options?.find((option) => option.value === value)
          )
          .filter((option) => !!option?.value) || []) as SelectBoxOptionType[];
      },
      [options]
    );
    const onHandleChange = React.useCallback(
      (value: typeof valueProps) => {
        onChange?.(value);
        const changeOptions: any = getSelectedOptions(value);
        onOptionChange?.(changeOptions);
      },
      [getSelectedOptions, onChange, onOptionChange]
    );

    const [value, onValueChange] = useUncontrolled({
      value: valueProps ?? [],
      defaultValue: defaultValue,
      onChange: onHandleChange,
    });

    const onHandleOptionChange = React.useCallback(
      (option: SelectBoxOptionType, isSelected: boolean) => {
        if (isSelected) {
          return onValueChange(
            value.filter((value) => value !== option?.value)
          );
        }
        onValueChange([...value, option.value]);
      },
      [onValueChange, value]
    );
    const selectedOptions = React.useMemo(
      () => getSelectedOptions(value),
      [getSelectedOptions, value]
    );

    const renderSuffixPrefix = React.useCallback(
      ({
        option,
        suffixOrPrefix,
      }: {
        option: SelectBoxOptionType;
        suffixOrPrefix: SuffixPrefixOptionType;
      }) => {
        if (CommonUtils.isFunction(suffixOrPrefix))
          return (suffixOrPrefix as Function)?.(option);
        return suffixOrPrefix;
      },
      []
    );
    const displayValue = React.useMemo(() => {
      if (selectedOptions?.length) {
        const displayOptions = selectedOptions.slice(0, displayLimit);
        const moreSelectedOptions = [...(selectedOptions || [])].splice(
          displayLimit,
          selectedOptions?.length
        );
        return (
          <div className="flex items-center w-full gap-1">
            {displayOptions?.map((option) => (
              <div
                className={cn(
                  "px-2 py-1  font-normal flex gap-2 items-center border rounded ",
                  {
                    "cursor-pointer hover:line-through hover:text-destructive":
                      !disabled,
                  }
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  if (disabled) return;
                  onHandleOptionChange(option, true);
                  setOpen(true);
                }}
                key={option?.value}
              >
                {option?.label}{" "}
                {renderSuffixPrefix({
                  option,
                  suffixOrPrefix: suffix,
                })}
              </div>
            ))}
            {moreSelectedOptions?.length > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <>
                      {" "}
                      <Badge>+{moreSelectedOptions?.length}</Badge>
                    </>
                  </TooltipTrigger>
                  <TooltipContent>
                    {moreSelectedOptions
                      ?.map((option) => option?.label)
                      .join(", ")}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        );
      }
    }, [
      disabled,
      displayLimit,
      onHandleOptionChange,
      renderSuffixPrefix,
      selectedOptions,
      suffix,
    ]);
    const canClear = React.useMemo(() => {
      return isClearable && selectedOptions?.length > 0;
    }, [isClearable, selectedOptions]);
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger disabled={disabled} asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("min-w-[200px] px-2 justify-between", className)}
            disabled={disabled}
            size={size}
          >
            {displayValue ?? (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <div className="flex items-center ">
              {canClear && (
                <Cross1Icon
                  className="w-4 font-bold opacity-50 hover:text-destructive hover:opacity-100"
                  onClick={() => onValueChange([])}
                />
              )}
              <CaretSortIcon className="h-4 ml-1 opacity-50 shrink-0" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          ref={ref}
          className="p-0 w-[var(--radix-popover-trigger-width)]"
        >
          <Command>
            {isSearchable && (
              <CommandInput
                placeholder="Search option..."
                className="h-9"
                onValueChange={onSearchValue}
                value={searchValue}
              />
            )}

            <CommandEmpty className="text-center pt-2">
              No option found.
            </CommandEmpty>
            <CommandList>
              {isSearchLoading && <CommandLoading />}
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = value.includes(option?.value);
                  return (
                    <CommandItem
                      key={option.value}
                      value={option?.label}
                      onSelect={() => onHandleOptionChange(option, isSelected)}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50 [&_svg]:invisible"
                            )}
                          >
                            <CheckIcon className={cn("h-4 w-4")} />
                          </div>
                          <div className="flex flex-col">
                            <span>{option?.label}</span>
                            <span className="text-xs text-muted-foreground">
                              {option?.subLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                      {!!suffix && (
                        <div className="flex items-center ml-auto ">
                          {renderSuffixPrefix({
                            option,
                            suffixOrPrefix: suffix,
                          })}
                        </div>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <div
              className={cn(
                "items-center justify-between p-3 text-sm border-t flex"
              )}
            >
              <div
                onClick={() => onValueChange([])}
                className="cursor-pointer hover:underline "
              >
                Clear All
              </div>

              <div>
                {value?.length || 0} of {options?.length}
              </div>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelectBox.displayName = "MultiSelectBox";
