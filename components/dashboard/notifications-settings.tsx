'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from "lucide-react";
import { Separator } from '@/components/ui/separator';

interface NotificationsSettingsProps {
  user: any;
}

export function NotificationsSettings({ user }: NotificationsSettingsProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
    productUpdates: true,
  });

  const handleSaveSettings = async () => {
    setIsSaving(true);

    try {
      // In a real application, you would save this to Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: 'Settings updated',
        description: 'Your notification settings have been updated successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message || 'Failed to update settings',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Manage how we contact you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications about your account activity via email.
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => 
                setSettings((prev) => ({ ...prev, emailNotifications: checked }))
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing-emails">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about new features, promotions, and offers.
              </p>
            </div>
            <Switch
              id="marketing-emails"
              checked={settings.marketingEmails}
              onCheckedChange={(checked) => 
                setSettings((prev) => ({ ...prev, marketingEmails: checked }))
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="security-alerts">Security Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about security alerts and suspicious activities.
              </p>
            </div>
            <Switch
              id="security-alerts"
              checked={settings.securityAlerts}
              onCheckedChange={(checked) => 
                setSettings((prev) => ({ ...prev, securityAlerts: checked }))
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="product-updates">Product Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about product updates and new features.
              </p>
            </div>
            <Switch
              id="product-updates"
              checked={settings.productUpdates}
              onCheckedChange={(checked) => 
                setSettings((prev) => ({ ...prev, productUpdates: checked }))
              }
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings} disabled={isSaving}>
          {isSaving && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
}