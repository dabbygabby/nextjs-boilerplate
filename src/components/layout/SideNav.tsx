import Link from "next/link";
import { useRouter } from "next/router";
import { Home, Users, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the nav items outside the component so they can be reused
const navItems = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/agents",
    label: "Agents",
    icon: BarChart2,
  },
  {
    href: "/workflows",
    label: "Workflows",
    icon: Users,
  },

];

// Create a NavItems component to avoid duplication
function NavItems() {
  const router = useRouter();
  
  return (
    <div className="space-y-1">
      {navItems.map((item) => {
        const isActive = router.pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

// The original SideNav for desktop view
export function SideNav() {
  return (
    <aside className="hidden md:block w-64 shrink-0 border-r bg-white dark:bg-neutral-950">
      <nav className="flex h-full flex-col p-4">
        <NavItems />
      </nav>
    </aside>
  );
}

// Export the NavItems for use in the mobile sheet
export { NavItems }; 