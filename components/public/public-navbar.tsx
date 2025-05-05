'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { projectConfig } from '@/config/project.config';
import { Menu, X } from 'lucide-react';

export function PublicNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">{projectConfig.appName}</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {projectConfig.navigation.public.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
        
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b bg-background">
          <div className="container py-4 flex flex-col gap-4">
            <nav className="flex flex-col gap-3">
              {projectConfig.navigation.public.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground ${
                    pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 pt-2">
              <Button asChild variant="outline">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button asChild>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}