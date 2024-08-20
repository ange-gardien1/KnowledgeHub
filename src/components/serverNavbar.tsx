// components/ServerNavbar.tsx
import { auth } from "@/app/auth";
import Navbar from "./navBar";



export default async function ServerNavbar() {
  const session = await auth();
  return <Navbar session={session} />;
}
