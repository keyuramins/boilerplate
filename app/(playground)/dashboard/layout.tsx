import { ReactNode } from "react";
import { Button } from "@/components/ui/button"; // Example shadcn button
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // shadcn sidebar components

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="m-4">Open Sidebar</Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-gray-900 text-white">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <nav className="mt-4 space-y-2">
            <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-800">
              Dashboard
            </a>
            <a href="/settings" className="block px-4 py-2 hover:bg-gray-800">
              Settings
            </a>
            <a href="/profile" className="block px-4 py-2 hover:bg-gray-800">
              Profile
            </a>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <div className="h-16 bg-gray-800 text-white flex items-center px-4">
          Navbar
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}