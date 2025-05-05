'use client';

import { useState } from 'react';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { UserNav } from '@/components/dashboard/user-nav';
import { projectConfig } from '@/config/project.config';
import { Menu } from 'lucide-react';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <span className="font-bold text-xl">{projectConfig.appName}</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr] md:gap-6 lg:gap-10 py-6">
        {/* Sidebar */}
        <aside
          className={`fixed top-[4rem] z-30 -ml-2 md:ml-0 pb-12 shadow-lg md:shadow-none md:block bg-background md:relative md:top-0 w-full md:w-auto h-[calc(100vh-4rem)] transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <DashboardNav className="md:py-0" />
        </aside>

        {/* Black overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Content */}
        <main className="flex w-full flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}