import { trpc } from "../_trpc/client";


export type User = {
    id: string;
    username: string; // Or whatever fields you have
  };

export const useUsers = () => {
  const { data: users, isLoading: isLoadingUsers, error } = trpc.users.getAll.useQuery();

  return {
    users,
    isLoadingUsers,
    error,
  };
};
