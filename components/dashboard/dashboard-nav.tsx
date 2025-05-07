'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { projectConfig } from '@/config/project.config';
import { cn } from '@/lib/utils';
import { getIconComponent } from "@/components/common/icons";

interface DashboardNavProps {
  className?: string;
  collapsed?: boolean;
}

export function DashboardNav({ className, collapsed = false }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <ScrollArea className={cn('h-full', className)}>
      <div className="flex flex-col gap-2">
        {projectConfig.navigation.dashboard.map((item, index) => {
          const Icon = getIconComponent(item.icon);
          const isActive = pathname === item.href;
          
          if (collapsed) {
            return (
              <TooltipProvider key={index} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      size="icon"
                      className={cn(
                        "w-10 h-10 my-1",
                        isActive && "bg-secondary"
                      )}
                      asChild
                    >
                      <Link href={item.href}>
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{item.name}</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" align="center" className="font-medium">
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }
          
          return (
            <Button
              key={index}
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn(
                'justify-start h-10',
                isActive && 'bg-secondary'
              )}
              asChild
            >
              <Link href={item.href}>
                <Icon className="mr-2 h-5 w-5" />
                {item.name}
              </Link>
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
