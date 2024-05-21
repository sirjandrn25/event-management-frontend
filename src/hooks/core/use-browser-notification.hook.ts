"use client";
import { useCallback, useEffect, useState } from "react";

const useBrowserNotification = () => {
  const [permission, setPermission] = useState("default");
  const askForPermission = useCallback(() => {
    alert("Please grant notification permission to receive notifications.");
  }, []);
  useEffect(() => {
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "denied") askForPermission();
        setPermission(permission);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }, [askForPermission]);

  const onSendNotification = useCallback(
    (message: string) => {
      if (permission === "granted") {
        new Notification("Calendar Notifications", {
          icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
          body: ` ${message}`,
        });
      } else {
        askForPermission();
      }
    },
    [askForPermission, permission]
  );
  return {
    onSendNotification,
  };
};

export default useBrowserNotification;
