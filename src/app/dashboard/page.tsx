import { redirect } from "next/navigation";
import { auth } from "../auth";
import Sidebar from "@/components/sideBar";
import GetProjects from "../projects/getProjects";
import GetRequest from "./EditResquest";
import { DocumentCount } from "./numberOfDoc";
import { TextDocumentCount } from "./numberOfUploaded";
import { ProjectsCount } from "./numberOfProjects";
import Navbar from "@/components/navBar";

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
        <Navbar session={session}/>
        <div className="flex-1 mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <DocumentCount />
            <TextDocumentCount />
            <ProjectsCount />
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="bg-white shadow-md rounded-lg p-6 col-span-1">
              <h2 className="text-xl font-semibold mb-4">Edit Requests</h2>
              <GetRequest />
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 col-span-2">
              <h2 className="text-xl font-semibold mb-4">Projects</h2>
              <GetProjects  session={session}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
