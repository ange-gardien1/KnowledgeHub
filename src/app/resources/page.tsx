import { redirect } from "next/navigation";
import { auth } from "../auth";
import Sidebar from "@/components/sideBar";
import ResourcesPage from "./resources";
import Navbar from "@/components/navBar";


export default async function ResourcesPages() {
  const session = await auth();
  const user = session?.user?.id;

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar /> 
      <div className="flex-1 flex flex-col">
        <Navbar session={session}/>
        <main className="flex-1 p-6 overflow-auto">
       <ResourcesPage/>
        </main>
      </div>
    </div>
  );
}
