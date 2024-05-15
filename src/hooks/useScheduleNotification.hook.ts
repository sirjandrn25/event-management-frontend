import { useEffect } from "react";
import useBrowserNotificationHook from "./core/use-browser-notification.hook";

const useScheduleNotification = ({ events }: { events: any[] }) => {
  const { onSendNotification } = useBrowserNotificationHook();
  const onStoreNotification = ({ events }: { events: any[] }) => {};
  useEffect(() => {
    events.forEach((event) => {});
  }, [events]);
  return {};
};

export default useScheduleNotification;
