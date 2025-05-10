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
import { getApi, postApi } from '@/lib/fetch';

export function ApiSettings() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateApiKey = async () => {
    setLoading(true);
    try {
      const { data, error } = await postApi<{ apiKey: string }>('/api/generate-key');
      
      if (error) {
        throw new Error(error);
      }

      if (!data?.apiKey) {
        throw new Error('No API key received');
      }

      setApiKey(data.apiKey);
      toast({
        title: 'Success',
        description: 'API key generated successfully',
      });
    } catch (error) {
      console.error('Error generating API key:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to generate API key',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!apiKey) return;

    try {
      await navigator.clipboard.writeText(apiKey);
      toast({
        title: 'Success',
        description: 'API key copied to clipboard',
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast({
        title: 'Error',
        description: 'Failed to copy API key to clipboard',
        variant: 'destructive',
      });
    }
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
                value={apiKey || ''}
                readOnly
                className="font-mono flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={generateApiKey} 
            disabled={loading}
          >
            {loading ? (
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