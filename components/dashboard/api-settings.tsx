'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Copy, RefreshCw, LoaderCircle } from 'lucide-react';

interface ApiSettingsProps {
  user: any;
}

export function ApiSettings({ user }: ApiSettingsProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('fk-7f4cc2ab-bc7d-4f5e-9139-d3e9e92cd15a');

  const handleGenerateKey = async () => {
    setIsGenerating(true);

    try {
      // In a real application, you would generate this via Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      setApiKey(`fk-${crypto.randomUUID()}`);

      toast({
        title: 'API key generated',
        description: 'Your new API key has been generated successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message || 'Failed to generate API key',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: 'Copied',
      description: 'API key copied to clipboard',
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage your API keys to interact with our services programmatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Your API keys carry many privileges, so be sure to keep them secure. Do not share your API keys in publicly accessible areas such as GitHub, client-side code, etc.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="flex gap-2">
              <Input
                id="api-key"
                value={apiKey}
                readOnly
                className="font-mono flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyKey}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={handleGenerateKey} 
            disabled={isGenerating}
          >
            {isGenerating ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Regenerate Key
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>
            Learn how to use our API with comprehensive documentation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Our API documentation provides detailed information about endpoints, request parameters, and response formats. Use the button below to access it.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              View Documentation
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}