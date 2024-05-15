"use client";

import EventCreateEditForm from "@/components/forms/event/event-create-edit.form";
import { Button } from "@/components/ui/button";
import { SelectBox } from "@/components/ui/selectBox/select-box";
import moment from "moment";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomEvent from "./custom-event";
import { useSchedulerContext } from "./scheduler-provider";

const localizer = momentLocalizer(moment);

const Scheduler = () => {
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");
  const [currentView, setCurrentView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [openModal, setOpenModal] = useState<boolean>();
  const [eventDate, setEventDate] = useState<any>({});
  const { events, refetch } = useSchedulerContext();

  const handleSelect = ({ start, end }: any) => {
    setOpenModal(true);
    setEventDate({ start, end });
    // const title = window.prompt("New Event name");
    // if (title) {
    //   setEvents([...events, { title, start, end }]);
    // }
  };

  const timeZones = [
    {
      label: "UTC",
      value: "UTC",
    },
    {
      label: "Eastern Time (US & Canada)",
      value: "America/New_York",
    },
    {
      label: "London",
      value: "Europe/London",
    },
  ];
  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };
  const handleNavigate = (date: Date, view: string) => {
    setCurrentDate(date);
    setCurrentView(view);
  };
  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <>
      {" "}
      <EventCreateEditForm
        {...{ startTime: eventDate?.start, endTime: eventDate?.end }}
        {...{ openModal, setOpenModal }}
        callback={() => {
          refetch?.();
        }}
      />
      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          onSelectSlot={handleSelect}
          selectable
          view={currentView as any}
          defaultView={currentView as any}
          onNavigate={handleNavigate}
          components={{
            event: CustomEvent,
            toolbar: (props) => (
              <div className="flex py-4 items-center gap-4">
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Button variant={"outline"} size={"sm"} onClick={handleToday}>
                    Today
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => handleNavigate(currentDate, "prev")}
                  >
                    Back
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => handleNavigate(currentDate, "next")}
                  >
                    Next
                  </Button>
                </div>
                <SelectBox
                  options={timeZones}
                  value={selectedTimezone}
                  onChange={(value) => {
                    setSelectedTimezone((value as string) ?? "");
                  }}
                />

                <div style={{ flex: 1 }}>{props.label}</div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {((props?.views as string[]) ?? [])?.map((view: any) => (
                    <Button
                      key={view}
                      className={` capitalize ${
                        props.view === view ? "active" : ""
                      }`}
                      variant={currentView === view ? "default" : "outline"}
                      size={"sm"}
                      onClick={() => handleViewChange(view)}
                    >
                      {view}
                    </Button>
                  ))}
                </div>
              </div>
            ),
          }}
        />
      </div>
    </>
  );
};

export default Scheduler;
