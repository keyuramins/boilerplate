"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = supabaseBrowserClient;
  const [currentPathname, setCurrentPathname] = useState('');

  const protectedRoutes = ['/dashboard', '/profile', '/subscription', '/feedback'];

  useEffect(() => {
    setCurrentPathname(pathname);
  }, [pathname]);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/");
  };

  // Helper to get display name
  const displayName = user?.user_metadata?.displayName || user?.user_metadata?.full_name || "Profile";

  return (
    <header className="w-full border-b shadow-sm px-5 py-2 bg-background text-foreground">
      <div 
      className={`max-w-7xl mx-auto w-full flex items-center
        ${
          !protectedRoutes.includes(currentPathname) && 
          "justify-between"
          || "justify-end"
        }`}>
        {
          !protectedRoutes.includes(currentPathname) && (
            <div className="font-bold text-lg cursor-pointer">
              <Link href="/">{process.env.NEXT_PUBLIC_SITENAME}</Link>
            </div>
          )
        }
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          {!user ? (
            <>
              <Button asChild variant="outline">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild variant="default">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <span className="font-medium">{displayName}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/subscription">Subscription</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
} 