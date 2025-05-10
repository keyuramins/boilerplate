'use client';

import React from 'react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Show error toast
    toast({
      variant: "destructive",
      title: "An error occurred",
      description: error.message || "Something went wrong. Please try again.",
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-2xl font-bold text-destructive">Something went wrong</h2>
            <p className="text-muted-foreground">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <div className="space-x-4">
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
              <Button
                variant="default"
                onClick={this.handleReset}
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 