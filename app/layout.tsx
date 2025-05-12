import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import { projectConfig } from "@/config/project.config";
import ErrorBoundary from "@/components/providers/error-boundary";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  viewportFit: "cover",
  userScalable: true,
};

export const metadata: Metadata = {
  title: {
    default: projectConfig.appTitle,
    template: `%s | ${projectConfig.appTitle}`,
  },
  description: projectConfig.appDescription,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  authors: [{ name: projectConfig.appTitle }],
  creator: projectConfig.appTitle,
  publisher: projectConfig.appTitle,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: projectConfig.appTitle,
  },
  applicationName: projectConfig.appTitle,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: projectConfig.appTitle,
    description: projectConfig.appDescription,
    siteName: projectConfig.appTitle,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: projectConfig.appTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: projectConfig.appTitle,
    description: projectConfig.appDescription,
    creator: projectConfig.appTitle,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
	<link rel="icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-icon.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
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
            crawl={true}
            speed={200}
            shadow={false}
          />
          <ErrorBoundary>
            <Suspense fallback={<Loading/>}>
              {children}
            </Suspense>
          </ErrorBoundary>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

