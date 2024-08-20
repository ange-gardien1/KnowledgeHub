"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/signin");
  };

  return (
    <button
      onClick={handleSignOut}
      className="font-semibold hover:bg-blue-50 items-center flex justify-center text-gray-600 hover:text-gray-800"
    >
      Sign Out
    </button>
  );
}
