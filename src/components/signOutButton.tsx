"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ redirect: false });
    router.push("/signin");
  };

  return (
    <button
      onClick={handleSignOut}
      className="font-semibold hover:bg-blue-50 items-center flex justify-center text-gray-600 hover:text-gray-800 relative"
      disabled={loading}
    >
      {loading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0114.93-4.93L18.36 6.5A6 6 0 005 12h-1z"
            ></path>
          </svg>
          Logging out...
        </span>
      ) : (
        "Sign Out"
      )}
    </button>
  );
}
