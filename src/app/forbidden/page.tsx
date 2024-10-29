import { redirect } from "next/navigation";
import { auth } from "../auth";
import Sidebar from "@/components/sideBar";

import Navbar from "@/components/navBar";
import Forbidden from "@/components/forbidden";

export default async function Dashboardpage() {
  const session = await auth();
  const user = session?.user?.id;

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className=" min-h-screen relative bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col p-6">
        <Navbar session={session} />
      </div>
      <Forbidden/>
    </div>
  );
}
