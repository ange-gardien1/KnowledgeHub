import { redirect } from "next/navigation";
import { auth } from "../auth";
import Sidebar from "@/components/sideBar";

import Navbar from "@/components/navBar";
import Settings from "./settings";

export default async function Setting() {
  const session = await auth();
  const user = session?.user?.id;
  const roleId = session?.user.roleId;

  if (!user) {
    redirect("/signin");
  }

  if (!roleId) {
    redirect("/forbidden");
  }

  if (roleId !== "8f6d6f9e-36d6-4db1-8f6a-c1a0dfcc8a72") {
    redirect("/forbidden");
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar session={session} />
        <main className="flex-1 p-6 overflow-auto">
          <Settings />
        </main>
      </div>
    </div>
  );
}
