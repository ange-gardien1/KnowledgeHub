// components/NotificationSheet.tsx

import { trpc } from "@/app/_trpc/client";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { format } from "date-fns";

export const useNotifications = () => {
  return trpc.getNotificationByUserId.useQuery();
};

const NotificationSheet = () => {
  const { data, isLoading } = useNotifications();

  if (isLoading) {
    return <p>Loading notifications...</p>;
  }

  return (
    <SheetContent className="p-6 bg-gray-50">
      <SheetHeader>
        <SheetTitle className="text-2xl font-semibold">Notifications</SheetTitle>
        <SheetDescription className="text-sm text-gray-500">
          Here are your latest notifications.
        </SheetDescription>
      </SheetHeader>
      <div className="mt-4 space-y-4">
        {data?.map((notification) => (
          <div
            key={notification.id}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <p className="text-lg font-medium text-gray-800">
              {notification.message}
            </p>
            <p className="text-sm text-gray-500">
              {format(new Date(notification.createdAt), "PPpp")}
            </p>
          </div>
        ))}
      </div>
    </SheetContent>
  );
};

export default NotificationSheet;
