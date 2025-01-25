import { BarChartComponent } from "@/components/barChart";
import Navbar from "@/components/navBar";
import Sidebar from "@/components/sideBar";
import { auth } from "../auth";
import { AreaChartComponent } from "@/components/areChart";
import { TextDocumentCount } from "../dashboard/numberOfUploaded";
import { DocumentCount } from "../dashboard/numberOfDoc";
import { ProjectsCount } from "../dashboard/numberOfProjects";

export default async function Metrics() {
  const session = await auth();

  return (
    <div className="flex flex-col h-screen">
      <Navbar session={session} />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex flex-col lg:flex-row flex-grow p-4 space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-grow bg-white shadow-md rounded-lg p-4">
            <div className="flex gap-x-2">
              <TextDocumentCount />
              <DocumentCount />
              <ProjectsCount />
            </div>
            {/* <AreaChartComponent /> */}
          </div>
          {/* <div className="flex-grow bg-white shadow-md rounded-lg p-4">
            <BarChartComponent />
          </div> */}
        </div>
      </div>
    </div>
  );
}
