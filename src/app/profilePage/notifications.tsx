import { trpc } from "../_trpc/client";

const GetNotifications = () => {
  const { data, isLoading } = trpc.getNotificationByUserId.useQuery();

  if (isLoading) {
    return <p>Loading notifications...</p>;
  }

  return (
    <div>
      <div>Hello, these are my notifications:</div>
      {data?.map((notification) => (
        <div key={notification.id}>
          <p>{notification.message}</p>
          <p>{notification.createdAt}</p>
        </div>
      ))}
    </div>
  );
};

export default GetNotifications;
