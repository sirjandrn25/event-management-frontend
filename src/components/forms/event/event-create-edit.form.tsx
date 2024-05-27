import AutoForm, { AutoFormSubmit } from "@/components/autoForm/auto-form";
import { DatePicker } from "@/components/ui/date-picker";
import { Icons } from "@/components/ui/icons";
import { ModalDialog } from "@/components/ui/modal-dialog";
import { TagInput } from "@/components/ui/tag-input";
import { toast } from "@/hooks/core/use-toast";
import useCustomMutation from "@/hooks/core/useCustomMutation.hook";
import useQueryList from "@/hooks/core/useQueryList.hook";
import { DateUtils } from "@/utils/date.utils";
import { ReactNode, useCallback, useState } from "react";
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
  const { data: users = [] } = useQueryList({
    endPoint: "users",
  });
  const [dateRange, setDateRange] = useState({
    start_time: new Date(data?.start_time),
    end_time: new Date(data?.end_time),
  });
  const handleDateRange = useCallback(
    (key: "start_time" | "end_time", value: Date) => {
      setDateRange((prev) => ({ ...dateRange, [key]: value }));
    },
    [dateRange]
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
      setParticipates([]);
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
        onSubmit={(values) => {
          if (isEdit) {
            if (
              dateRange?.start_time?.getTime() > dateRange?.end_time?.getTime()
            )
              return toast({
                title: "Error",
                description: "End time must be greater than start time",
                variant: "destructive",
              });
            return onSubmit({
              ...data,
              participates,
              ...values,
              start_time: dateRange?.start_time,
              end_time: dateRange?.end_time,
            });
          }

          onSubmit({
            ...values,
            start_time: startTime,
            end_time: endTime,
            participates,
          });
        }}
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
            <TagInput
              tags={participates}
              options={users?.map((user: any) => user?.email)}
              setTags={setParticipates}
              isEmail
            />
          </div>
          {isEdit && (
            <div className="grid grid-cols-2 gap-2">
              <DatePicker
                date={dateRange?.start_time as Date}
                setDate={(value) => {
                  handleDateRange("start_time", value as Date);
                }}
              />
              <DatePicker
                date={dateRange?.end_time as Date}
                setDate={(value) => {
                  handleDateRange("end_time", value as Date);
                }}
              />
            </div>
          )}
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

export default EventCreateEditForm;
