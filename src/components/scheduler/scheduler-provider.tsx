"use client";
import { socket } from "@/constants/socket.constant";
import useBrowserNotification from "@/hooks/core/use-browser-notification.hook";
import useQueryList from "@/hooks/core/useQueryList.hook";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useAuthContext } from "../context/auth.provider";

type SchedulerContextType = {
  events: any[];
  refetch?: () => void;
};
export const SchedulerContext = createContext<SchedulerContextType>({
  events: [],
});

export const SchedulerProvider = ({ children }: { children: ReactNode }) => {
  const { onSendNotification } = useBrowserNotification();
  const { user } = useAuthContext();
  useEffect(() => {
    socket.on(`scheduler-event`, (data) => {
      const event = data?.data;
      if (
        event?.participates?.include(user?.email) ??
        event?.user_id !== user?.id
      )
        return onSendNotification(`${data?.title} event received`);
    });
  }, [onSendNotification, user?.email, user?.id]);
  useEffect(() => {
    socket.on("connect_error", (err) => {
      console.error(`connect_error due to ${err.message}`);
    });
  }, []);
  const { data: events = [], refetch } = useQueryList({
    endPoint: "events",
    method: "getAll",
  });
  const sanitizedEvents = useMemo(
    () =>
      events.map((event: any) => ({
        ...event,
        start: event?.start_time,
        end: event?.end_time,
      })),
    [events]
  );
  const value = useMemo(
    () => ({
      refetch,
      events: sanitizedEvents,
    }),
    [refetch, sanitizedEvents]
  );

  return (
    <SchedulerContext.Provider value={value}>
      {children}
    </SchedulerContext.Provider>
  );
};

export const useSchedulerContext = () => {
  return useContext(SchedulerContext);
};
