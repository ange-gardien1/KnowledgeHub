import { redirect } from "next/navigation";
import { auth } from "../auth";
import Sidebar from "@/components/sideBar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import GetDocuments from "./upload";

export default async function Dashboardpage() {
  const session = await auth();
  const user = session?.user?.id;

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="w-screen flex bg-white ">
      <Sidebar />
      <div className="w-full pl-20 pt-4">
        {" "}
        <div>
          <p>Hi</p>
          Welcome: {session?.user?.name}
        </div>
        <GetDocuments />
      </div>
    </div>
  );
}
