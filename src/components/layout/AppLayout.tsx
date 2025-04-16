import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Menu } from "lucide-react";
import { TopNav } from "./TopNav";
import { SideNav, NavItems } from "./SideNav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  
  // Show loading while checking authentication
  if (status === 'loading') {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }
  
  // If not authenticated, don't render content
  if (!session) {
    return <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-medium">Authentication required</h2>
        <p className="mt-2">Please log in to access this page.</p>
        <Button className="mt-4" onClick={() => window.location.href = '/login'}>
          Go to login
        </Button>
      </div>
    </div>;
  }
  
  // User is authenticated, render the layout
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <SideNav />
        
        {/* Mobile navigation */}
        <div className="md:hidden fixed bottom-4 left-4 z-40">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="rounded-full shadow-md">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[260px] p-0">
              <nav className="flex h-full flex-col p-4">
                <NavItems />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
} 