"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { createClientSupabaseClient } from "@/lib/supabase/client";
import { projectConfig } from "@/config/project.config";
import { landingConfig } from "@/config/landing.config";
import { Button } from "@/components/ui/button";
import { ThemeToggle as ModeToggle } from "@/components/common/theme-toggle";
import { cn } from "@/lib/utils";

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClientSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    
    checkAuth();
  }, []);

  // Handle scroll for sticky navbar effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle Dropdown toggle
  const toggleDropdown = (name: string) => {
    if (dropdownOpen === name) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(name);
    }
  };

  // Determine if the navigation item is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Process navigation items to handle potential dropdowns
  const navItems = projectConfig.navigation.public.map(item => {
    // Basic check for dropdown
    if (item.href === "#" && "items" in item) {
      return { ...item, isDropdown: true };
    }
    return { ...item, isDropdown: false };
  });

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              {landingConfig.logo && (
                <img
                  src={landingConfig.logo}
                  alt={projectConfig.appName}
                  className="h-8 w-auto"
                />
              )}
              <span className="font-bold text-lg">{projectConfig.appName}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.isDropdown ? (
                  <div className="relative inline-block">
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={cn(
                        "flex items-center text-sm font-medium hover:text-primary",
                        dropdownOpen === item.name ? "text-primary" : "text-foreground/80"
                      )}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {dropdownOpen === item.name && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-popover border border-border z-10">
                        <div className="py-1">
                          {item.items?.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className={cn(
                                "block px-4 py-2 text-sm hover:bg-muted",
                                isActive(subItem.href) ? "text-primary font-medium" : "text-foreground/80"
                              )}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      isActive(item.href) ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Auth Buttons and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            
            {!isLoggedIn ? (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/dashboard">
                <Button size="sm">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-[9999] md:hidden pt-16">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {/* Dedicated Close Button */}
            <div className="flex justify-end -mt-2 mb-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                aria-label="Close Menu"
                className="hover:bg-muted/60"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {navItems.map((item, index) => (
              <div key={index}>
                {item.isDropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={cn(
                        "flex w-full items-center justify-between py-2 text-base font-medium",
                        dropdownOpen === item.name ? "text-primary" : "text-foreground"
                      )}
                    >
                      {item.name}
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        dropdownOpen === item.name ? "rotate-180" : ""
                      )} />
                    </button>
                    {dropdownOpen === item.name && (
                      <div className="ml-4 mt-1 mb-2 space-y-2 border-l-2 border-border pl-4">
                        {item.items?.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className={cn(
                              "block py-1 text-sm",
                              isActive(subItem.href) ? "text-primary font-medium" : "text-foreground/80"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-2 text-base font-medium",
                      isActive(item.href) ? "text-primary" : "text-foreground/80"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-border space-y-3">
              {!isLoggedIn ? (
                <>
                  <Link href="/login" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="default" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button size="default" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/dashboard" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button size="default" className="w-full">
                    Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
