export const siteConfig = {
  // Core site information
  name: "Akvitek",
  description: "A modern SaaS platform built with Next.js and Supabase",
  url: process.env.NODE_ENV === "pro" ? "https://your-saas-url.com" : "http://localhost:3000",
  company: {
    name: "Your Company Name",
    address: "123 Business St, City, Country",
    email: "contact@yourcompany.com",
    phone: "+1 (555) 123-4567",
    legal: {
      termsUrl: "/terms",
      privacyUrl: "/privacy",
      cookiePolicyUrl: "/cookies",
    },
  },

  // SEO and social
  seo: {
    titleTemplate: "%s | Your SaaS Name",
    defaultTitle: "Your SaaS Name - Modern SaaS Platform",
    defaultDescription: "A powerful solution for your business needs",
    defaultImage: "https://your-saas-url.com/og.jpg",
    twitter: {
      handle: "@your-handle",
      site: "@your-site",
      cardType: "summary_large_image",
    },
  },

  // Social links and integrations
  social: {
    twitter: "https://twitter.com/your-handle",
    github: "https://github.com/your-org/your-repo",
    linkedin: "https://linkedin.com/company/your-company",
    facebook: "https://facebook.com/your-page",
    instagram: "https://instagram.com/your-profile",
  },

  // Navigation
  navigation: {
    mainNav: [
      {
        title: "Features",
        href: "/features",
      },
      {
        title: "Pricing",
        href: "/pricing",
      },
      {
        title: "Blog",
        href: "/blog",
      },
      {
        title: "Documentation",
        href: "/docs",
      },
    ],
    footerNav: [
      {
        title: "Product",
        items: [
          { title: "Features", href: "/features" },
          { title: "Pricing", href: "/pricing" },
          { title: "Documentation", href: "/docs" },
        ],
      },
      {
        title: "Company",
        items: [
          { title: "About", href: "/about" },
          { title: "Blog", href: "/blog" },
          { title: "Careers", href: "/careers" },
        ],
      },
      {
        title: "Legal",
        items: [
          { title: "Privacy", href: "/privacy" },
          { title: "Terms", href: "/terms" },
          { title: "Cookies", href: "/cookies" },
        ],
      },
    ],
  },

  // Marketing content
  marketing: {
    hero: {
      title: "Your SaaS Solution",
      description: "A powerful solution for your business needs",
      cta: {
        primary: {
          text: "Get Started",
          href: "/signup",
        },
        secondary: {
          text: "Learn More",
          href: "/features",
        },
      },
    },
    features: [
      {
        title: "Feature 1",
        description: "Description of feature 1",
        icon: "feature1-icon",
      },
      {
        title: "Feature 2",
        description: "Description of feature 2",
        icon: "feature2-icon",
      },
      {
        title: "Feature 3",
        description: "Description of feature 3",
        icon: "feature3-icon",
      },
    ],
    pricing: {
      plans: [
        {
          name: "Starter",
          price: "$9",
          description: "Perfect for small teams",
          features: ["Feature 1", "Feature 2", "Feature 3"],
        },
        {
          name: "Pro",
          price: "$29",
          description: "For growing businesses",
          features: ["All Starter features", "Feature 4", "Feature 5"],
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For large organizations",
          features: ["All Pro features", "Feature 6", "Feature 7"],
        },
      ],
    },
  },

  // Dashboard configuration
  dashboard: {
    sidebarNav: [
      {
        title: "Overview",
        href: "/dashboard",
        icon: "dashboard",
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: "settings",
      },
      {
        title: "Billing",
        href: "/dashboard/billing",
        icon: "billing",
      },
    ],
    defaultRoute: "/dashboard",
    features: {
      analytics: true,
      notifications: true,
      userManagement: true,
      teamManagement: true,
    },
  },

  // Authentication configuration
  auth: {
    providers: ["google", "github"],
    redirectAfterSignIn: "/dashboard",
    redirectAfterSignOut: "/",
    emailVerification: {
      enabled: true, // Whether email verification is required for new signups
      description: "Require users to verify their email address before accessing the platform",
    },
    enablePasswordReset: true,
    sessionTimeout: 24 * 60 * 60, // 24 hours in seconds
  },

  // Theme configuration
  theme: {
    colors: {
      primary: "#0070f3",
      secondary: "#7928ca",
      accent: "#ff0080",
      background: "#ffffff",
      foreground: "#000000",
      muted: "#f1f5f9",
      border: "#e2e8f0",
    },
    typography: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        base: "16px",
        sm: "14px",
        lg: "18px",
      },
    },
    spacing: {
      base: "1rem",
      sm: "0.5rem",
      lg: "2rem",
    },
    borderRadius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "1rem",
    },
  },

  // API and integration settings
  api: {
    baseUrl: "https://api.your-saas-url.com",
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
  },

  // Feature flags
  features: {
    enableBlog: true,
    enableDocs: true,
    enableAnalytics: true,
    enableNotifications: true,
    enableUserFeedback: true,
  },

  // Localization
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "fr", "de"],
    fallbackLocale: "en",
  },

  // Performance settings
  performance: {
    enableImageOptimization: true,
    enableFontOptimization: true,
    enableScriptOptimization: true,
    cacheTTL: 3600, // 1 hour in seconds
  },
} as const;

export type SiteConfig = typeof siteConfig; 
