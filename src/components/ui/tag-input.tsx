"use client";

import { toast } from "@/hooks/core/use-toast";
import { useUncontrolled } from "@/hooks/core/use-uncontrolled.hook";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Command, CommandGroup, CommandItem, CommandList } from "./command";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export enum Delimiter {
  Comma = ",",
  Enter = "Enter",
}

interface TagInputProps {
  tags?: string[];
  setTags?: (value: string[]) => void;
  className?: string;
  delimiter?: Delimiter;
  delimiterList?: string[];
  isEmail?: boolean;
  options?: string[];
}
function isValidEmail(email: string) {
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export const TagInput = ({
  tags,
  setTags,
  className,
  delimiter = Delimiter.Comma,
  delimiterList,
  isEmail,
  options,
}: TagInputProps) => {
  const [value, onChange] = useUncontrolled({
    value: tags,
    onChange: setTags,
    defaultValue: [],
  });
  const [inputValue, setInputValue] = useState<string>("");
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      delimiterList
        ? delimiterList.includes(e.key)
        : e.key === delimiter || e.key === Delimiter.Enter
    ) {
      e.preventDefault();
      const newTagText = inputValue.trim();
      if (isEmail) {
        if (isValidEmail(newTagText)) {
          setInputValue("");
          onChange([...value, newTagText]);
          return;
        }
        return toast({
          title: "Valid Email Needed",
          variant: "destructive",
        });
      }
      onChange([...value, newTagText]);
      // Check if the tag is in the autocomplete options if restrictTagsToAutocomplete is true
    }
  };
  const filteredOptions = useMemo(() => {
    if (inputValue?.length < 3) return [];
    return options
      ?.filter((option) => !tags?.includes(option.toLocaleLowerCase()))
      .filter((option) => option?.includes(inputValue));
  }, [inputValue, options, tags]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={true}>
        <PopoverTrigger>
          <div className="grid gap-2">
            {(tags as any)?.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {tags?.map((tag) => (
                  <TagBadge
                    key={tag}
                    tag={tag}
                    onClick={() =>
                      onChange(value?.filter((value) => value !== tag))
                    }
                  />
                ))}
              </div>
            )}
            <Input
              type="text"
              placeholder={`Separate by ${delimiter} `}
              onKeyDown={handleKeyDown}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className=" w-[var(--radix-popover-trigger-width)] p-0">
          {(filteredOptions as any)?.length > 0 ? (
            <Command>
              <CommandList>
                <CommandGroup>
                  {filteredOptions?.map((option) => (
                    <CommandItem
                      key={option}
                      value={option}
                      onSelect={() => {
                        onChange([...value, option]);
                      }}
                    >
                      <div className="flex items-center mr-auto ">{option}</div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          ) : (
            <></>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

interface TagBadgeProps {
  tag: string;
  onClick?: () => void;
}
const TagBadge = ({ tag, onClick }: TagBadgeProps) => {
  return (
    <div
      onClick={onClick}
      className="text-xs cursor-pointer hover:border-destructive hover:text-destructive hover:strike flex items-center bg-muted rounded text-default border py-1 px-2"
    >
      {tag}
    </div>
  );
};
