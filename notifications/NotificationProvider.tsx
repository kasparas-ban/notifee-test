import { useEffect } from "react";
import notifee from "@notifee/react-native";

import { displayNotification } from "./displayNotification";

export let chanId: string | null = null;

export default function NotificationProvider() {
  useEffect(() => {
    initChannel().then((chan) => {
      chanId = chan;
    });

    return () => {
      // Application is killed
      notifee.stopForegroundService();
    };
  }, []);

  useEffect(() => {
    notifee.registerForegroundService(async () => {
      return new Promise(() => {
        if (!chanId) return;
        displayNotification({ channelId: chanId });
      });
    });
  }, [chanId]);

  return null;
}

const initChannel = async () => {
  // Request permissions (required for iOS)
  await notifee.requestPermission();
  // Create a channel (required for Android)
  const chan = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
    vibration: false,
  });

  return chan;
};
