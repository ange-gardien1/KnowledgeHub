import { trpc } from "@/app/_trpc/client";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import { useState } from "react";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { useNotificationById } from "@/app/hooks/useNotificationById";

export const useNotifications = () => {
  return trpc.getNotificationByUserId.useQuery();
};

const NotificationSheet = () => {
  const { data, isLoading } = useNotifications();
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);
  const [requestDetails, setRequestDetails] = useState<any>(null);
  const approveEditRequestMutation = trpc.request.approveEditRequest.useMutation();
  const notificationQuery = useNotificationById(selectedNotification);

  

  const fetchRequestDetails = (notificationId: string) => {
    setSelectedNotification(notificationId);
  };

  const approveEditRequest = async (editRequestId: string) => {
    try {
      await approveEditRequestMutation.mutateAsync({ editRequestId });
      alert("Edit request approved!");
    } catch (error) {
      console.error("Failed to approve edit request:", error);
      alert("Failed to approve edit request. Please try again.");
    }
  };

  const handleCloseRequestDetails = () => {
    setSelectedNotification(null);
    setRequestDetails(null);
  };

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
              {notificationQuery.isFetched && notificationQuery.data && (
                <PopoverContent className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 p-4">
                  <p className="text-lg font-medium text-gray-800">
                    Request Details
                  </p>
                  <p className="text-sm text-gray-500">
                    Notification Message: {notificationQuery.data.message}
                  </p>
                  {/* <p className="text-sm text-gray-500">
                    Request Status: {notificationQuery.data.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    Document Title: {notificationQuery.data.title}
                  </p> */}
                  <button
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
                    onClick={() => approveEditRequest(notificationQuery.data.id)}
                  >
                    Approve Request
                  </button>
                  <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={handleCloseRequestDetails}
                  >
                    Close
                  </button>
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
