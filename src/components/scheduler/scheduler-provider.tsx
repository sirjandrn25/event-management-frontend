"use client";
import useQueryList from "@/hooks/core/useQueryList.hook";

import { ReactNode, createContext, useContext, useMemo } from "react";

type SchedulerContextType = {
  events: any[];
  refetch?: () => void;
};
export const SchedulerContext = createContext<SchedulerContextType>({
  events: [],
});

export const SchedulerProvider = ({ children }: { children: ReactNode }) => {
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
