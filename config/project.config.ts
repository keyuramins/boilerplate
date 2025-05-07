import { landingConfig } from "@/config/landing.config";

export const projectConfig = {
  appName: "Akvitek SASS Boilerplate",
  appTitle: "Next.js + Supabase + ShadCN UI",
  appDescription:
    "A production-ready Next.js boilerplate with Supabase Auth and ShadCN UI",
  providers: {
    email: true,
    google: true,
  },
  auth: {
    emailVerification: {
      enabled: true, // To disable is have to do it in supabase
    },
  },
  publicRoutes: [
    "/",
    "/login",
    "/register",
    // '/about',
    // '/contact',
    // '/pricing',
    // '/blog',
    // '/forgot-password',
    // '/reset-password',
  ],
  protectedRoutes: ["/dashboard", "/dashboard/settings"],
  themeSettings: {
    default: "system" as "light" | "dark" | "system",
  },
  navigation: {
    public: [
      { name: 'About', href: '/#about' },
      { name: 'Pricing', href: '/#pricing' },
      { name: 'Contact', href: '/#contact' },
      // { name: 'Blog', href: '/blog' },
    ],
    dashboard: [
      { name: "Dashboard", href: "/dashboard", icon: "layoutDashboard" },
      { name: "Settings", href: "/dashboard/settings", icon: "settings" },
    ],
  },
  landing: landingConfig,
  // Default plans
  plans:[
    {
      name: "Hobby",
      price: "$0",
      description: "Perfect for trying out",
      features: [
        "Up to 3 projects",
        "Basic analytics",
        "24-hour support response time",
        "Community access",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For growing businesses",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "4-hour support response time",
        "Community access",
        "Team collaboration tools",
        "API access",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Everything in Pro",
        "Dedicated support",
        "1-hour support response time",
        "Custom integrations",
        "Advanced security",
        "Custom branding",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]
};
