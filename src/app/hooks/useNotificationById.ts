import { trpc } from "@/app/_trpc/client";

export const useNotificationById = (notificationId: string | null) => {
  return trpc.notification.getNotificationById.useQuery(
    { notificationId: notificationId ?? "" },
    { enabled: !!notificationId } // Fetch only if notificationId is provided
  );
};
