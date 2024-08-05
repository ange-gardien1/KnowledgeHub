
import { redirect } from "next/navigation";
import { auth } from "../auth";
import GetProjects from "./getProjects";

export default async function projects() {
    const session = await auth();
    const user = session?.user?.id;

    if(!user){
        redirect("/signin");
    }

    return (
        <div>
            <GetProjects/>
        </div>
    )
    
}