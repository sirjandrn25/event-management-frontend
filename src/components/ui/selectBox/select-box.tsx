"use client";

import { CommandLoading } from "cmdk";
import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";

import { useUncontrolled } from "@/hooks/core/use-uncontrolled.hook";
import { cn } from "@/lib/utils";
import { CommonUtils } from "@/utils/common.utils";
import { CaretSortIcon, CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "../button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import {
  SelectBoxOptionType,
  SelectBoxProps,
  SuffixPrefixOptionType,
} from "./select-box.type";

export const SelectBox = React.forwardRef<HTMLDivElement, SelectBoxProps>(
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
      suffix,
      prefix,
      onCreateNew,
      isClearable,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState<boolean>();
    const onHandleChange = React.useCallback(
      (value: typeof valueProps) => {
        onChange?.(value);
        onOptionChange?.(options?.find((option) => option?.value == value));
      },
      [onChange, onOptionChange, options]
    );

    const [value, onValueChange] = useUncontrolled({
      value: valueProps,
      defaultValue,
      onChange: onHandleChange,
    });
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
      if (value) {
        const option = options.find((option) => option.value == value);
        if (!option) return;
        return (
          <div className="flex items-center w-full">
            {renderSuffixPrefix({ option, suffixOrPrefix: prefix })}{" "}
            {option?.label}{" "}
            {renderSuffixPrefix({ option, suffixOrPrefix: suffix })}
          </div>
        );
      }
    }, [options, prefix, renderSuffixPrefix, suffix, value]);
    const canClear = React.useMemo(() => {
      return isClearable && !!value;
    }, [isClearable, value]);
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger disabled={disabled} asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("min-w-[200px] px-4 justify-between", className)}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    onValueChange("");
                  }}
                />
              )}
              <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          ref={ref}
          className=" w-[var(--radix-popover-trigger-width)] p-0"
        >
          <Command>
            {isSearchable && (
              <CommandInput
                placeholder="Search option..."
                className="h-9"
                onValueChange={onSearchValue}
              />
            )}

            <CommandEmpty>No option found.</CommandEmpty>
            <CommandList>
              {isSearchLoading && <CommandLoading />}
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option?.label}
                    onSelect={() => {
                      onValueChange(
                        option?.value == value ? "" : option?.value
                      );
                      setOpen(false);
                    }}
                  >
                    {renderSuffixPrefix({
                      option,
                      suffixOrPrefix: prefix,
                    })}
                    <div className="flex flex-col">
                      <span>{option?.label}</span>
                      {!!option?.subLabel && (
                        <span className="text-xs text-muted-foreground">
                          {option?.subLabel}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center ml-auto ">
                      <CheckIcon
                        className={cn(
                          " h-4 w-4",
                          value == option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {renderSuffixPrefix({
                        option,
                        suffixOrPrefix: suffix,
                      })}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            {CommonUtils.isFunction(onCreateNew) && (
              <>
                <div
                  className={cn(
                    "text-center hover:cursor-pointer justify-center hover:bg-muted w-full border-t p-2 text-sm  flex"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCreateNew?.();
                    setOpen(false);
                  }}
                >
                  + Create New
                </div>
              </>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
SelectBox.displayName = "SelectBox";
