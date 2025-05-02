import Link from "next/link";
import { Menu, Sparkle } from "lucide-react";
import { siteConfig } from "@/config/site";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import AuthButton from "@/components/auth-buttons";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Nav() {
  return (
    <section className="p-4 border-b">
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Logo />
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {siteConfig.navigation.mainNav.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <AuthButton />
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Logo />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  {siteConfig.navigation.mainNav.map((item) => renderMobileMenuItem(item))}

                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <AuthButton />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
}

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Sparkle className="size-5" />
      <span className="text-lg font-semibold tracking-tighter">{siteConfig.name}</span>
    </Link>
  );
};

const renderMenuItem = (item: { title: string; href: string }) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.href}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: { title: string; href: string }) => {
  return (
    <Link key={item.title} href={item.href} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};
