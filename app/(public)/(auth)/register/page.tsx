import { RegisterForm } from '@/components/auth/register-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projectConfig } from '@/config/project.config';
import { LoginForm } from '@/components/auth/login-form';

export const metadata = {
  title: 'Register',
  description: 'Create a new account',
};

export default function RegisterPage() {
  return (
    <main className="flex-grow flex items-center min-h-screen justify-center py-16 bg-muted/30">
      <div className="container max-w-md px-4 md:px-6">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">{projectConfig.appName}</h1>
            <p className="text-muted-foreground">Create your account to get started.</p>
          </div>
          
          <div className="bg-card rounded-lg border shadow-sm p-6">
              <Tabs defaultValue="register">
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
