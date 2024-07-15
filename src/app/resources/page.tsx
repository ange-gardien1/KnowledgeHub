import { redirect } from "next/navigation";
import { auth } from "../auth";
import Sidebar from "@/components/sideBar";
import GetResources from "./getResources";

export default async function () {
  const session = await auth();
  const user = session?.user?.id;

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="w-screen flex bg-white">
      <div className="w-full flex">
        <Sidebar />
        <div className="flex-1 flex flex-col pl-20 pt-4">
          <GetResources />
        </div>
      </div>
    </div>
  );
}
