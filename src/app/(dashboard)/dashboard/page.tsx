"use client";
import Scheduler from "@/components/scheduler/scheduler";
import { SchedulerProvider } from "@/components/scheduler/scheduler-provider";

const DashboardPage = () => {
  return (
    <div className="container">
      <SchedulerProvider>
        <Scheduler />
      </SchedulerProvider>
    </div>
  );
};

export default DashboardPage;
