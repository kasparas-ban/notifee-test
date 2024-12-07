import notifee, { AndroidForegroundServiceType } from "@notifee/react-native";

type DisplayNotificationProps = {
  channelId: string | null;
};

export const displayNotification = async (props: DisplayNotificationProps) => {
  const { channelId } = props;
  if (!channelId) return;

  await notifee.displayNotification({
    id: channelId,
    title: "Test notification",
    android: {
      channelId,
      ongoing: true,
      asForegroundService: true,
      foregroundServiceTypes: [
        AndroidForegroundServiceType.FOREGROUND_SERVICE_TYPE_SPECIAL_USE,
      ],
    },
  });
};
