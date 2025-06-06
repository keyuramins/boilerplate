import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import ClientThemeProvider from "@/components/ClientThemeProvider";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import ProtectedLayout from "@/components/ProtectedLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager 
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googlesyndication.com" />
        <script src="/gtm.js" async />
        */}
        <noscript>
          <div className="bg-card text-foreground p-4 text-center rounded shadow border border-border max-w-md mx-auto mt-8">
            JavaScript is required for the best experience on this site.
          </div>
        </noscript>
      </head>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <Toaster />
        <ClientThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextTopLoader color="#2563eb" showSpinner={false} />
          <ProtectedLayout>
            <main className="flex-1 flex flex-col" aria-label="Main content">
              {children}
            </main>
          </ProtectedLayout>
          <Footer />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
