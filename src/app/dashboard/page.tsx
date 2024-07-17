
import { redirect } from "next/navigation";
import { auth } from "../auth";
import Sidebar from "@/components/sideBar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import GetDocuments from "./documents";
import { DocumentCount } from "./numberOfDoc";
import { Navbar } from "@/components/navBar";



export default async function Dashboardpage() {
  const session = await auth();
  const user = session?.user?.id;

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="flex bg-white ">
      <Sidebar />
      <div className="w-full pl-16 pt-10">
        {" "}
          <Navbar/>
          <DocumentCount/>
        <GetDocuments />
      </div>
    </div>
  );
}
