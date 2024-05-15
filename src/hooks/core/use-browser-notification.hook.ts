import { useCallback, useEffect, useState } from "react";

const useBrowserNotificationHook = () => {
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    Notification.requestPermission()
      .then((permission) => {
        setPermission(permission);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }, []);
  const onSendNotification = useCallback(
    (message: string) => {
      if (permission === "granted") {
        new Notification("Calendar Notifications", {
          icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
          body: ` ${message}`,
        });
      } else {
        alert("Please grant notification permission to receive notifications.");
      }
    },
    [permission]
  );
  return {
    onSendNotification,
  };
};

export default useBrowserNotificationHook;
