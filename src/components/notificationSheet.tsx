// // components/NotificationSheet.tsx

// import { trpc } from "@/app/_trpc/client";
// import {
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { format } from "date-fns";

// export const useNotifications = () => {
//   return trpc.getNotificationByUserId.useQuery();
// };

// const NotificationSheet = () => {
//   const { data, isLoading } = useNotifications();

//   if (isLoading) {
//     return <p>Loading notifications...</p>;
//   }

//   return (
//     <SheetContent className="p-6 bg-gray-50">
//       <SheetHeader>
//         <SheetTitle className="text-2xl font-semibold">Notifications</SheetTitle>
//         <SheetDescription className="text-sm text-gray-500">
//           Here are your latest notifications.
//         </SheetDescription>
//       </SheetHeader>
//       <div className="mt-4 space-y-4">
//         {data?.map((notification) => (
//           <div
//             key={notification.id}
//             className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
//           >
//             <p className="text-lg font-medium text-gray-800">
//               {notification.message}
//             </p>
//             <p className="text-sm text-gray-500">
//               {format(new Date(notification.createdAt), "PPpp")}
//             </p>
//           </div>
//         ))}
//       </div>
//     </SheetContent>
//   );
// };

// export default NotificationSheet;



// components/NotificationSheet.tsx

import { trpc } from "@/app/_trpc/client";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Adjust the import path as per your project structure

export const useNotifications = () => {
  return trpc.getNotificationByUserId.useQuery();
};

const NotificationSheet = () => {
  const { data, isLoading } = useNotifications();
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);
  const [requestDetails, setRequestDetails] = useState<any>(null);

  const fetchRequestDetails = async (notificationId: string) => {
    try {
      const result = await trpc.request.getRequestFromNotification.useQuery({ notificationId });
      setRequestDetails(result);
      setSelectedNotification(notificationId);
    } catch (error) {
      console.error("Failed to fetch request details:", error);
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
            <Popover key={notification.id}>
              <PopoverTrigger>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={() => fetchRequestDetails(notification.id)}
                >
                  View Request
                </button>
              </PopoverTrigger>
              {selectedNotification === notification.id && (
                <PopoverContent className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 p-4">
                  <p className="text-lg font-medium text-gray-800">
                    Request Details
                  </p>
                  <p className="text-sm text-gray-500">
                    Notification Message: {requestDetails?.notification?.message}
                  </p>
                  <p className="text-sm text-gray-500">
                    Request Status: {requestDetails?.editRequest?.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    Document Title: {requestDetails?.document?.title}
                  </p>
                  {/* Display other relevant details as needed */}
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
