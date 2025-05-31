/**
 * @file components/Sidebar.tsx
 * @description Main sidebar component for navigation.
 * @author [Your Name]
 * @date 2024-07-31
 */
'use client';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, User, CreditCard, LogOut, BookOpen, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const { open, toggleSidebar } = useSidebar();
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = supabaseBrowserClient;

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then((result: { data: { user: any } }) => setUser(result?.data?.user || null));
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: string, session: { user: any } | null) => {
        setUser(session?.user || null);
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <ShadSidebar collapsible="icon" className="min-h-screen">
      <SidebarHeader className="flex items-center justify-between px-2">
        <div className={cn("flex items-center gap-2 transition-all", open ? "justify-start" : "flex-col")}
             style={{ minHeight: 40 }}>
          <Image src="/favicon-32x32.png" alt="Site Icon" width={30} height={30} priority />
          {open && (
            <span className="font-bold text-lg tracking-tight transition-all">
              {process.env.NEXT_PUBLIC_SITENAME}
            </span>
          )}
                  <button
          onClick={toggleSidebar}
          className="ml-auto p-1 cursor-pointer rounded-md hover:bg-muted transition-colors"
          aria-label="Toggle Sidebar"
        >
          {open ? (
            <ChevronLeft className="w-4 h-4" aria-hidden />
          ) : (
            <ChevronRight className="w-4 h-4" aria-hidden />
          )}
        </button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {/* Dashboard */}
          <SidebarMenuItem key="/dashboard" className="flex justify-center items-center">
            <SidebarMenuButton asChild tooltip="Dashboard">
              <Link
                href="/dashboard"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-medium text-base",
                  pathname.startsWith("/dashboard")
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-muted-foreground"
                )}
                aria-current={pathname.startsWith("/dashboard") ? "page" : undefined}
              >
                <Home className="w-5 h-5 shrink-0" aria-hidden />
                <span className={cn("transition-all duration-200", !open && "opacity-0 w-0 overflow-hidden")}>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* Profile */}
          <SidebarMenuItem key="/profile" className="flex justify-center items-center">
            <SidebarMenuButton asChild tooltip="Profile">
              <Link
                href="/profile"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-medium text-base",
                  pathname.startsWith("/profile")
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-muted-foreground"
                )}
                aria-current={pathname.startsWith("/profile") ? "page" : undefined}
              >
                <User className="w-5 h-5 shrink-0" aria-hidden />
                <span className={cn("transition-all duration-200", !open && "opacity-0 w-0 overflow-hidden")}>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* Subscription */}
          <SidebarMenuItem key="/subscription" className="flex justify-center items-center">
            <SidebarMenuButton asChild tooltip="Subscription">
              <Link
                href="/subscription"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-medium text-base",
                  pathname.startsWith("/subscription")
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-muted-foreground"
                )}
                aria-current={pathname.startsWith("/subscription") ? "page" : undefined}
              >
                <CreditCard className="w-5 h-5 shrink-0" aria-hidden />
                <span className={cn("transition-all duration-200", !open && "opacity-0 w-0 overflow-hidden")}>Subscription</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      {/* Logout */}
      {user && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-medium text-base text-destructive hover:bg-destructive/10 w-full"
                )}
                aria-label="Logout"
                tooltip="Logout"
              >
                <LogOut className="w-5 h-5 shrink-0" aria-hidden />
                <span className={cn("transition-all duration-200", !open && "opacity-0 w-0 overflow-hidden")}>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </ShadSidebar>
  );
} 