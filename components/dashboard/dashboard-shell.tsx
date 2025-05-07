"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { UserNav } from '@/components/dashboard/user-nav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { projectConfig } from '@/config/project.config';
import { cn } from '@/lib/utils';
import { getIconComponent } from '@/components/common/icons';

interface DashboardShellProps {
  children: React.ReactNode;
}

export  function DashboardShell({ children }: DashboardShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Handle hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    
    // Check local storage for sidebar preference
    const storedSidebarState = localStorage.getItem('sidebarCollapsed');
    if (storedSidebarState) {
      setIsSidebarCollapsed(storedSidebarState === 'true');
    }
    
    // Check for screen size and collapse sidebar on smaller screens
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save sidebar state in local storage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.toString());
    }
  }, [isSidebarCollapsed, isMounted]);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  if (!isMounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 md:px-6">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <div className="flex h-16 items-center px-4 border-b">
                <Link href="/dashboard" className="flex items-center font-bold text-lg">
                  {projectConfig.appName}
                </Link>
              </div>
              <ScrollArea className="h-[calc(100dvh-4rem)]">
                <DashboardNav className="py-4" />
              </ScrollArea>
            </SheetContent>
          </Sheet>

          {/* Logo for desktop */}
          <div className="flex items-center">
            <Link href="/dashboard" className={cn(
              "flex items-center font-bold text-lg transition-all duration-300",
              isSidebarCollapsed ? "lg:ml-0" : "lg:ml-2"
            )}>
              <span className="hidden lg:inline-block">{projectConfig.appName}</span>
            </Link>
          </div>

          {/* Right side header items */}
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className={cn(
          "fixed left-0 top-16 z-30 hidden lg:flex flex-col h-[calc(100dvh-4rem)] border-r bg-background transition-all duration-300",
          isSidebarCollapsed ? "w-16" : "w-64"
        )}>
          <div className="flex flex-col h-full">
            <div className="flex-1">
              {!isSidebarCollapsed ? (
                <DashboardNav className="py-4 px-3" />
              ) : (
                <nav className="flex flex-col items-center gap-2 py-4">
                  {projectConfig.navigation.dashboard.map((item, index) => {
                    const Icon = getIconComponent(item.icon);
                    const isActive = pathname === item.href;
                    
                    return (
                      <Button
                        key={index}
                        variant={isActive ? 'secondary' : 'ghost'}
                        size="icon"
                        className={cn(
                          "w-10 h-10",
                          isActive && "bg-secondary"
                        )}
                        asChild
                        title={item.name}
                      >
                        <Link href={item.href}>
                          {Icon && <Icon className="h-5 w-5" />}
                        </Link>
                      </Button>
                    );
                  })}
                </nav>
              )}
            </div>
            <Separator />
            <div className="p-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="w-full h-10 justify-center"
              >
                {isSidebarCollapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <ChevronLeft className="h-5 w-5" />
                )}
                <span className="sr-only">
                  {isSidebarCollapsed ? "Expand" : "Collapse"} sidebar
                </span>
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={cn(
          "flex-1 overflow-hidden transition-all duration-300",
          isSidebarCollapsed ? "lg:pl-16" : "lg:pl-64"
        )}>
          <ScrollArea className="h-[calc(100dvh-4rem)]">
            <div className="container py-6 px-4 md:px-6">
              {children}
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}	
