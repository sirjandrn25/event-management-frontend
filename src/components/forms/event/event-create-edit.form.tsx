import AutoForm, { AutoFormSubmit } from "@/components/autoForm/auto-form";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { ModalDialog } from "@/components/ui/modal-dialog";
import { toast } from "@/hooks/core/use-toast";
import { useUncontrolled } from "@/hooks/core/use-uncontrolled.hook";
import useCustomMutation from "@/hooks/core/useCustomMutation.hook";
import { cn } from "@/lib/utils";
import { DateUtils } from "@/utils/date.utils";
import { ReactNode, useState } from "react";
import { z } from "zod";

interface EventCreateEditFormProps {
  callback?: () => void;
  setOpenModal?: (value?: boolean) => void;
  openModal?: boolean;
  startTime?: Date;
  endTime?: Date;
  data?: any;
  trigger?: ReactNode;
}

const formSchema = z.object({
  title: z.string(),
  //   start_time: z.date(),
  //   end_time: z.date(),
  description: z.string().optional(),
});
const EventCreateEditForm = ({
  callback,
  setOpenModal,
  openModal,
  startTime,
  endTime,
  data = {},
  trigger,
}: EventCreateEditFormProps) => {
  const isEdit = !!data?.id;
  const [participates, setParticipates] = useState<string[]>(
    isEdit ? data?.participates : []
  );

  const { onSubmit, isPending } = useCustomMutation({
    endPoint: isEdit ? `events/${data?.id}` : "events",
    schema: formSchema,
    method: isEdit ? "put" : "post",
    onSuccess: (data: any) => {
      toast({
        title: `${isEdit ? "Edit Event" : "Create Event"}`,
        description: `${isEdit ? "Edit Event" : "Create event"} Successfully`,
      });
      callback?.();
      setOpenModal?.(false);
    },
  });

  return (
    <ModalDialog
      title={`${isEdit ? "Edit Event" : "Create Event"}`}
      onToggle={setOpenModal}
      open={openModal}
      trigger={trigger}
    >
      <AutoForm
        values={{
          description: "",
          title: "",
          ...data,
        }}
        onSubmit={(values) =>
          isEdit
            ? onSubmit({
                ...data,
                participates,
                ...values,
              })
            : onSubmit({
                ...values,
                start_time: startTime,
                end_time: endTime,
                participates,
              })
        }
        fieldConfig={{
          title: {
            inputProps: {
              placeholder: "Title",
            },
          },
          //   start_time: {
          //     inputProps: {
          //       placeholder: "Start",
          //       label: "Start Time",
          //     },
          //   },
          //   end_time: {
          //     inputProps: {
          //       label: "End Time",
          //       placeholder: "End",
          //     },
          //   },
          description: {
            fieldType: "textarea",
            inputProps: {
              placeholder: "Description",
              type: "textarea",
            },
          },
        }}
        formSchema={formSchema}
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <div className=" text-sm">Participates</div>
            <TagInput tags={participates} setTags={setParticipates} isEmail />
            {/* <MultiSelectBox
              options={ParseToSelectBoxOption({
                data: filteredUsers ?? [],
                valueKey: "id",
                labelKey: "name",
                subLabelKey: "email",
              })}
            /> */}
          </div>
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Icons.clock className="h-4 w-4" />
            <div className="flex gap-2">
              ({DateUtils.displayDate(isEdit ? data?.start_time : startTime)}{" "}
              {" - "}
              {DateUtils.displayDate(isEdit ? data?.end_time : endTime)} ){" "}
              {new Date(
                isEdit ? data?.start_time : startTime
              )?.toLocaleTimeString()}
            </div>
          </div>
        </div>
        <AutoFormSubmit isLoading={isPending} className="w-full">
          Save
        </AutoFormSubmit>
      </AutoForm>
    </ModalDialog>
  );
};
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
}
function isValidEmail(email: string) {
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

const TagInput = ({
  tags,
  setTags,
  className,
  delimiter = Delimiter.Comma,
  delimiterList,
  isEmail,
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

  return (
    <div className={cn("grid gap-2", className)}>
      <Input
        type="text"
        placeholder={`Separate by ${delimiter} `}
        onKeyDown={handleKeyDown}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <div className="flex gap-2">
        {tags?.map((tag) => (
          <TagBadge
            key={tag}
            tag={tag}
            onClick={() => onChange(value?.filter((value) => value !== tag))}
          />
        ))}
      </div>
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

export default EventCreateEditForm;
