import React from "react";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User, Bell, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function TopNav() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b bg-white dark:bg-neutral-950">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="mr-4">
            <Image
              src="/logo.png"
              alt="Logo"
              width={195}
              height={52}
              priority
            />
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Show only on mobile */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          {/* Show on all devices */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center gap-2 p-2">
                <div className="rounded-full bg-neutral-100 p-1">
                  <User className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session?.user?.name || "User"}
                  </p>
                  <p className="text-xs leading-none text-neutral-500">
                    {session?.user?.email || ""}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 