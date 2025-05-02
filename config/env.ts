export const envConfig = {
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  isTest: process.env.NODE_ENV === "test",
  
  // API URLs
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    timeout: 10000, // 10 seconds
  },

  // Supabase Configuration
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  },

  // Analytics
  analytics: {
    enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || "",
    posthogApiKey: process.env.NEXT_PUBLIC_POSTHOG_API_KEY || "",
    posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST || "",
  },

  // Feature Flags
  features: {
    enableBlog: process.env.NEXT_PUBLIC_ENABLE_BLOG === "true",
    enableDocs: process.env.NEXT_PUBLIC_ENABLE_DOCS === "true",
    enableBilling: process.env.NEXT_PUBLIC_ENABLE_BILLING === "true",
  },

  // Rate Limiting
  rateLimit: {
    enabled: process.env.RATE_LIMIT_ENABLED === "true",
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
  },
} as const;

export type EnvConfig = typeof envConfig; 