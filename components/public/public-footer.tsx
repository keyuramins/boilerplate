import Link from 'next/link';
import { projectConfig } from '@/config/project.config';

export function PublicFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">{projectConfig.appName}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A production-ready Next.js boilerplate with Supabase Auth and ShadCN UI.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Navigation</h3>
              <nav className="flex flex-col space-y-2">
                {projectConfig.navigation.public.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </nav>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {projectConfig.appName}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            Built with Next.js, Supabase, and ShadCN UI
          </p>
        </div>
      </div>
    </footer>
  );
}