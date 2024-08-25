"use client";

import { useState } from "react";
import { IconBellRinging } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import NotificationSheet from "./notificationSheet";
import { trpc } from "@/app/_trpc/client";
import SignOutButton from "./signOutButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Navbar({ session }: { session: any }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data, isLoading } = trpc.notification.getNotificationByStatus.useQuery();


  const { data: roleName, isLoading: isRoleLoading } = trpc.Roles.getMyRole.useQuery(session?.user?.roleId, {
    enabled: !!session?.user?.roleId, 
  });

  const handleBellClick = () => {
    setIsSheetOpen(true);
  };

  const unreadNotificationCount = data?.filter((notification) => !notification.read).length || 0;

  return (
    <div className="fixed flex items-center top-0 border-b h-14 z-10 bg-white w-full">
      <div className="flex ml-auto items-center pr-16 gap-2">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <button onClick={handleBellClick} className="relative">
              <IconBellRinging stroke={1.5} className="text-gray-500" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center h-4 w-4 text-xs text-white bg-red-500 rounded-full">
                  {unreadNotificationCount}
                </span>
              )}
            </button>
          </SheetTrigger>
          {isSheetOpen && (
            <NotificationSheet
              isOpen={isSheetOpen}
              onClose={() => setIsSheetOpen(false)}
            />
          )}
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="flex items-center gap-2">
            <Button
              className="rounded-none bg-none text-gray-500 hover:text-gray-800 border-none hover:bg-none"
              variant="outline"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={session?.user?.image ?? undefined} />
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-default hover:bg-none flex flex-col space-y-2">
              <p className="font-bold text-sm">{session?.user?.name}</p>
              <p className="font-normal text-xs">{session?.user?.email}</p>
              <p className="font-normal text-xs">
                {isRoleLoading ? "Loading..." : roleName || "Guest"}
              </p>
            </DropdownMenuItem>
            <DropdownMenuItem className="font-semibold hover:bg-blue-50 items-center flex justify-center text-gray-600 hover:text-gray-800">
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
