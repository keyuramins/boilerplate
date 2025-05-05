'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientSupabaseClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { LoaderCircle } from 'lucide-react';

interface AccountSettingsProps {
  user: any;
}

const profileFormSchema = z.object({
  picture: z.string().optional(),
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  full_name: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  website: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
});

export function AccountSettings({ user }: AccountSettingsProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(user.user_metadata?.picture || null);
  const router = useRouter();
  const supabase = createClientSupabaseClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      picture: user.user_metadata?.picture || '',
      username: user.user_metadata?.username || '',
      email: user.email || '',
      full_name: user.user_metadata?.full_name || '',
      website: user.user_metadata?.website || '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setImagePreview(dataUri);
        form.setValue('picture', dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    setIsUpdating(true);

    try {
      const { error } = await supabase.auth.updateUser({
        email: values.email,
        data: {
          picture: values.picture,
          username: values.username,
          full_name: values.full_name,
          website: values.website,
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });

      router.refresh();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message || 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDeleteAccount() {
    setIsDeletingAccount(true);

    try {
      toast({
        title: 'Error',
        description: 'Account deletion is disabled in this demo.',
        variant: 'destructive',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message || 'Failed to delete account',
        variant: 'destructive',
      });
    } finally {
      setIsDeletingAccount(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Update your account information.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="picture"
                render={({ field }) => (
                  <FormItem>
                    {imagePreview && (
                      <div className="my-2">
                        <img
                          src={imagePreview}
                          alt="Profile picture preview"
                          className="h-32 w-32 object-cover rounded-full"
                        />
                      </div>
                    )}
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload a profile picture (JPEG, PNG, etc.).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display username.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormDescription>
                      This is your primary email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Update profile
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>
            Permanently delete your account and all of your data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            disabled={isDeletingAccount}
          >
            {isDeletingAccount && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
