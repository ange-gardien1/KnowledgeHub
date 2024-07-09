import { redirect } from "next/navigation";
import { auth } from "../auth";



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

    </div>
  );
}

