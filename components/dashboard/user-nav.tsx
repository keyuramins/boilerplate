'use client';

import { createClientSupabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'nextjs-toploader/app';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LoaderCircle, LogOut } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

export function UserNav() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientSupabaseClient();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setIsLoading(false);
    };

    getUser();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully.',
    });
  };

  if (isLoading) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <LoaderCircle className="h-5 w-5 animate-spin" />
      </Button>
    );
  }

  if (!user) {
    return (
      <Button variant="ghost" size="sm" asChild>
        <a href="/login">Sign In</a>
      </Button>
    );
  }

  const username = user.user_metadata?.username || user.email?.split('@')[0] || 'User';
  const initials = username
    .split(' ')
    .map((name: string) => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={username} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
