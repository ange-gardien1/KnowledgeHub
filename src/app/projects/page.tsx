
import { redirect } from "next/navigation";
import { auth } from "../auth";
import GetProjects from "./getProjects";
import ProjectCreate from "./createProject";
import { db } from "@/db";
import { roles } from "@/db/schema";


export default async function projects() {
    const session = await auth();
    console.log('Session:', session); 
    const user = session?.user?.id;

    if(!user){
        redirect("/signin");
    }
   
    return (
        <div>
           <div>
            <GetProjects/>
        </div>
        <div>
           <ProjectCreate/>
        </div>
        </div>
       

    )
    
}