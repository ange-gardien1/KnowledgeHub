import { trpc } from "../_trpc/client";


export type User = {
    id: string;
    username: string; 
  };

export const useUsers = () => {
  const { data: users, isLoading: isLoadingUsers, error } = trpc.users.getAll.useQuery();

  return {
    users,
    isLoadingUsers,
    error,
  };
};
