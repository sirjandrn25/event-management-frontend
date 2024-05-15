"use client";
import { toast } from "@/hooks/core/use-toast";
import { ApiService } from "@/utils/api-service.utils";
import { DateUtils } from "@/utils/date.utils";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, useRef } from "react";
import EventCreateEditForm from "../forms/event/event-create-edit.form";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { ModalDialog } from "../ui/modal-dialog";
import { useSchedulerContext } from "./scheduler-provider";

const CustomEvent = ({ event }: { event: any }) => {
  const { refetch } = useSchedulerContext();
  const modalRef = useRef<any>(null);
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
        <div className="flex items-start text-sm text-muted-foreground gap-2">
          <Icons.clock />
          <div className="flex gap-2">
            ({DateUtils.displayDate(event?.start)} {" - "}
            {DateUtils.displayDate(event?.end)}){" "}
            {new Date(event?.start)?.toLocaleTimeString()}
          </div>
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
