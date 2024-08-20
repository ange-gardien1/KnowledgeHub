import { redirect } from "next/navigation";
import { auth } from "../auth";
import Sidebar from "@/components/sideBar";
import Askchat from "@/components/askchat";
import Navbar from "@/components/navBar";

export default async function Ask(){
    const session = await auth();
    const user = session?.user?.id;
    if(!user){
        redirect("/signin")
    }
    return(
        <div className="w-screen flex bg-white">
        <div className="w-full flex">
          <Sidebar />
          <Navbar session={session}/>
          <div className="flex-1 flex flex-col pl-20 pt-4">
            <Askchat/>
          </div>
        </div>
      </div>
    )
}