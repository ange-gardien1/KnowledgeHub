'use client'

import { useEffect } from "react";
import { trpc } from "@/app/_trpc/client";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { useNotificationById } from "@/app/hooks/useNotificationById";

export const useNotifications = () => {
  return trpc.getNotificationByUserId.useQuery();
};

const NotificationSheet = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { data, isLoading } = useNotifications();
  const markAllAsReadMutation = trpc.notification.markNotificationAsRead.useMutation();

  useEffect(() => {
    if (isOpen) {
      // Mark all notifications as read when the sheet is opened
      markAllAsReadMutation.mutateAsync().catch((error) => {
        console.error("Failed to mark notifications as read:", error);
      });
    }
  }, [isOpen, markAllAsReadMutation]);

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
            <Popover>
              {notification.id && (
                <PopoverContent className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 p-4">
                  <p className="text-lg font-medium text-gray-800">
                    Request Details
                  </p>
                  <p className="text-sm text-gray-500">
                    Notification Message: {notification.message}
                  </p>
                </PopoverContent>
              )}
            </Popover>
          </div>
        ))}
      </div>
    </SheetContent>
  );
};

export default NotificationSheet;
