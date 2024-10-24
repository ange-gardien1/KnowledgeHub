
import { trpc } from "../_trpc/client";

export type User = {
  id: string;
  username: string;
  roleId: string | null;
};

export const useGuestUsers = () => {
  const {
    data: guestUsers,
    isLoading: isLoadingUsers,
    error,
  } = trpc.GuestUsers.getGuestUsers.useQuery();

  return {
    guestUsers,
    isLoadingUsers,
    error,
  };
};
