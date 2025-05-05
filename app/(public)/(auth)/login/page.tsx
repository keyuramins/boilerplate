import { PublicNavbar } from '@/components/public/public-navbar';
import { PublicFooter } from '@/components/public/public-footer';
import { LoginForm } from '@/components/auth/login-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RegisterForm } from '@/components/auth/register-form';
import { projectConfig } from '@/config/project.config';

export const metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default function LoginPage() {
  return (
      <main className="flex-grow flex items-center justify-center py-12 bg-muted/30">
        <div className="container max-w-md px-4 md:px-6">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">{projectConfig.appName}</h1>
              <p className="text-muted-foreground">Welcome back! Please login to your account.</p>
            </div>
            
            <div className="bg-card rounded-lg border shadow-sm p-6">
              <Tabs defaultValue="login">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="register">
                  <RegisterForm />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
  );
}
