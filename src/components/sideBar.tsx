import Link from "next/link"
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
} from "lucide-react"


import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { auth } from "@/app/auth"
import { Avatar, AvatarImage } from "./ui/avatar"

import { IconCirclePlus } from '@tabler/icons-react';
import { IconBrandOpenai } from '@tabler/icons-react';
import { IconShare3 } from '@tabler/icons-react';
import { IconLayoutDashboard } from '@tabler/icons-react';

export default async function Sidebar() {
    const session = await auth();
    const user = session?.user?.id

  return (
    <div className="flex min-h-screen  flex-col bg-white">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
     
          <Link
            href="/profilePage"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >

            <Avatar className=" h-10 w-10">
                <AvatarImage src={session?.user?.image ??undefined} />
              </Avatar>

            <span className="sr-only"></span>
          </Link>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <IconLayoutDashboard stroke={2} />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
           <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/documents"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <IconCirclePlus stroke={2} />
                <span className="sr-only">New Document</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">New Document</TooltipContent>
          </Tooltip>
          </TooltipProvider>
        <TooltipProvider>
           <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >

<IconShare3 stroke={2} />
                <span className="sr-only">Knowledge Sharing</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Knowledge Sharing</TooltipContent>
          </Tooltip>
          </TooltipProvider>
        <TooltipProvider>
           <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >  
                <IconBrandOpenai stroke={2} />
                <span className="sr-only">Ask AI</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Ask AI</TooltipContent>
         </Tooltip>
        </TooltipProvider>
   
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
           <Tooltip> 
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </nav>
      </aside>
     
    </div>
  )
}
