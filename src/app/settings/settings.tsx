"use client";
import React, { useState } from "react";
import { trpc } from "../_trpc/client";

const Settings: React.FC = () => {
  const {
    data: guestUsers,
    isLoading: isLoadingUsers,
    error,
    refetch,
  } = trpc.GuestUsers.getGuestUsers.useQuery();

  const [promotingUserId, setPromotingUserId] = useState<string | null>(null);

  const { mutate: promoteToAdmin } = trpc.GuestUsers.promoteToAdmin.useMutation(
    {
      onMutate: (variables) => {
        setPromotingUserId(variables.userId); 
      },
      onSuccess: () => {
        setPromotingUserId(null); 
        refetch();
      },
      onError: () => {
        setPromotingUserId(null); 
      },
    }
  );

  const handlePromote = (userId: string) => {
    promoteToAdmin({ userId });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h2>

        {isLoadingUsers ? (
          <div className="flex justify-center items-center">
            <p className="ml-4 text-gray-600">Loading users...</p>
          </div>
        ) : error ? (
          <p className="text-red-500">Error loading users: {error.message}</p>
        ) : guestUsers?.length === 0 ? (
          <p className="text-gray-600">No guest users found.</p>
        ) : (
          <ul className="space-y-4">
            {guestUsers?.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center bg-white shadow-md border p-4 rounded-lg"
              >
                <span className="text-lg font-semibold text-gray-700">
                  {user.username}
                </span>
                <button
                  onClick={() => handlePromote(user.id)}
                  disabled={promotingUserId === user.id}
                  className={`px-4 py-2 rounded-md transition-all ${
                    promotingUserId === user.id
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  {promotingUserId === user.id
                    ? "Promoting..."
                    : "Promote to Admin"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Settings;
