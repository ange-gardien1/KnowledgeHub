"use client";
import React from "react";

import { trpc } from "../_trpc/client";

const Settings: React.FC = () => {
  const {
    data: guestUsers,
    isLoading: isLoadingUsers,
    error,
  } = trpc.GuestUsers.getGuestUsers.useQuery();

  const { mutate: promoteToAdmin, isPending: isPromoting } =
    trpc.GuestUsers.promoteToAdmin.useMutation();
    

  const handlePromote = (userId: string) => {
    promoteToAdmin({ userId });
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold">Manage Users</h2>

          {isLoadingUsers ? (
            <p>Loading users...</p>
          ) : error ? (
            <p>Error loading users.</p>
          ) : guestUsers?.length === 0 ? (
            <p>No guest users found.</p>
          ) : (
            <ul className="space-y-4 mt-4">
              {guestUsers?.map((user) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center border p-4 rounded-md bg-gray-50"
                >
                  <span className="text-lg font-medium">{user.username}</span>
                  <button
                    onClick={() => handlePromote(user.id)}
                    disabled={isPromoting}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    {isPromoting ? "Promoting..." : "Promote to Admin"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
