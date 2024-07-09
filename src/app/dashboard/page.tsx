import { redirect } from "next/navigation";
import { auth } from "../auth";
import Sidebar from "@/components/sideBar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";




export default async function Dashboardpage() {

    const session = await auth();
    const user = session?.user?.id;

    if(!user){
    redirect("/signin")
    }

  return (
    <div>
      <div>
        <p>Hi</p>
       Welcome: {session?.user?.name}
    
      </div>
    <div>
        <Sidebar></Sidebar>
    </div>
    </div>
  );
}

