'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LoaderCircle } from "lucide-react";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { projectConfig } from '@/config/project.config';
import { cn } from '@/lib/utils';
import {getIconComponent} from "@/components/common/icons";

interface DashboardNavProps {
  className?: string;
}

export function DashboardNav({ className }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <ScrollArea className={cn('h-full px-3 py-4 md:pr-2', className)}>
      <div className="flex flex-col gap-2">
        {projectConfig.navigation.dashboard.map((item, index) => {
        const Icon = getIconComponent(item.icon);
 	        return (
            <Button
              key={index}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn(
                'justify-start',
                pathname === item.href && 'bg-secondary'
              )}
              asChild
            >
              <Link href={item.href}>
                <Icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
