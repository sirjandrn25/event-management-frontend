"use client";
import { toast } from "@/hooks/core/use-toast";
import useCustomMutation from "@/hooks/core/useCustomMutation.hook";
import { ApiService } from "@/utils/api-service.utils";
import { DateUtils } from "@/utils/date.utils";
import { useMutation } from "@tanstack/react-query";
import { setHours, setMinutes } from "date-fns";
import { ReactNode, useCallback, useRef, useState } from "react";
import { z } from "zod";
import EventCreateEditForm from "../forms/event/event-create-edit.form";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { ModalDialog } from "../ui/modal-dialog";
import { useSchedulerContext } from "./scheduler-provider";
const formSchema = z.object({
  start_time: z.date(),
});
const convertToTwoDigits = (value: number) => {
  if (value < 10) return `0${value}`;
  return `${value}`;
};
const getTimeFormat = (date: string) => {
  const dateTime = new Date(date);
  const hours = dateTime.getHours();

  const minutes = dateTime.getMinutes();
  return `${convertToTwoDigits(hours)}:${convertToTwoDigits(minutes)}`;
};
const convertTimeToDate = (date: Date, value: string) => {
  try {
    const hours = Number.parseInt(value.split(":")[0] ?? "0", 10);
    const minutes = Number.parseInt(value.split(":")[1] ?? "0", 10);

    let newDate = setHours(date ?? new Date(), hours);
    newDate = setMinutes(newDate ?? new Date(), minutes);
    if (newDate.toString() !== "Invalid Date") return newDate;
    return date;
  } catch (error) {
    return date;
  }
};
const CustomEvent = ({ event }: { event: any }) => {
  const { refetch } = useSchedulerContext();
  const modalRef = useRef<any>(null);
  const [editTime, setEditTime] = useState({
    start: getTimeFormat(event?.start),
    end: getTimeFormat(event?.end),
  });

  const { isPending: isDeleting, mutate: onDelete } = useMutation({
    mutationFn: async () => {
      const service = new ApiService(`events`);
      return await service.delete(event?.id);
    },
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "Event has been deleted",
      });
      refetch?.();
      modalRef?.current?.onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const { onSubmit, isPending } = useCustomMutation({
    endPoint: `events/${event?.id}`,
    method: "put",
    schema: formSchema,
    onSuccess: () => {
      toast({
        title: "Update",
        description: "Event has been changed time successfully",
      });
      refetch?.();
      modalRef?.current?.onClose();
    },
  });
  const handleEditTime = useCallback(
    (key: "start" | "end", value: string) => {
      setEditTime({
        ...editTime,
        [key]: value,
      });
    },
    [editTime]
  );
  const informationList: InfoItemProps[] = [
    {
      label: "Title",
      info: event.title,
    },
    {
      label: "Description",
      info: event.description,
    },
    {
      label: "Schedule Time",
      info: (
        <div className="grid gap-2">
          <div className="flex items-start text-sm text-muted-foreground gap-2">
            <Icons.clock />
            <div className="flex gap-2">
              ({DateUtils.displayDate(event?.start)} {" - "}
              {DateUtils.displayDate(event?.end)}){" "}
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newStartDate = convertTimeToDate(
                new Date(event?.start_time),
                editTime?.start
              );
              const newEndDate = convertTimeToDate(
                new Date(event?.end_time),
                editTime?.end
              );
              if (newStartDate?.getTime() > newEndDate?.getTime())
                return toast({
                  title: "Error",
                  description: "End time must be greater than start time",
                  variant: "destructive",
                });
              onSubmit({
                ...event,
                start_time: newStartDate,
                end_time: newEndDate,
              });
            }}
            className="flex items-center gap-2"
          >
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={editTime?.start}
                type="time"
                onChange={(e) => {
                  handleEditTime("start", e.target.value);
                }}
                disabled={isPending}
              />
              <Input
                value={editTime?.end}
                type="time"
                onChange={(e) => {
                  handleEditTime("end", e.target.value);
                }}
                disabled={isPending}
              />
            </div>
            <Button disabled={isPending} size={"sm"}>
              Change
            </Button>
          </form>
        </div>
      ),
    },
    {
      label: "Participates",
      info: (
        <div className="flex gap-2 items-center flex-wrap">
          {event?.participates?.map((el: string) => (
            <span className="lowercase" key={el}>
              {el} {" , "}
            </span>
          ))}
        </div>
      ),
    },
  ];
  return (
    <ModalDialog
      title={"Event Details"}
      ref={modalRef}
      rightComponent={
        <div className="flex items-center mr-4 gap-2">
          <EventCreateEditForm
            callback={() => {
              refetch?.();
              modalRef?.current?.onClose();
            }}
            trigger={
              <Button
                variant={"outline"}
                className="h-7 w-7 text-blue-500 border-blue-500"
                size={"icon"}
                disabled={isDeleting}
              >
                <Icons.pencil className="h-4 w-4 " />
              </Button>
            }
            data={event}
          />
          <Button
            disabled={isDeleting}
            onClick={() => onDelete?.()}
            className="h-7 w-7"
            variant={"destructive"}
            size={"icon"}
          >
            <Icons.trash className="h-4 w-4" />
          </Button>
        </div>
      }
      trigger={
        <div className="grid ">
          <div className="text-sm capitalize font-medium flex gap-2 items-center">
            {event.title}{" "}
            {/* <span className="text-xs">
          {" "}
          ({new Date(event?.start)?.toLocaleTimeString()} {"- "}{" "}
          {new Date(event?.end)?.toLocaleTimeString()})
        </span> */}
          </div>
          {event?.description && (
            <div className="text-white text-xs ">{event?.description} </div>
          )}
        </div>
      }
    >
      <div className="grid gap-2">
        {informationList?.map((information) => (
          <InfoItem {...information} key={information?.label} />
        ))}
      </div>
    </ModalDialog>
  );
};
interface InfoItemProps {
  label: string;
  info: string | ReactNode;
}
const InfoItem = ({ label, info }: InfoItemProps) => {
  return (
    <div className="gap-2 flex items-start text-sm">
      <div className="text-muted-foreground flex-nowrap min-w-[100px]">
        {label}:
      </div>
      <div className="font-medium capitalize">{info}</div>
    </div>
  );
};

export default CustomEvent;
