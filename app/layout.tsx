import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import { projectConfig } from "@/config/project.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: projectConfig.appTitle,
    template: `%s | ${projectConfig.appTitle}`,
  },
  description: projectConfig.appDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme={projectConfig.themeSettings.default}
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            showSpinner={false}
            color="hsl(var(--ring))"
            zIndex={9999}
          />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

