export const projectConfig = {
  appName: 'Akvitek SASS Boilerplate',
  appTitle: 'Next.js + Supabase + ShadCN UI',
  appDescription: 'A production-ready Next.js boilerplate with Supabase Auth and ShadCN UI',
  providers: {
    email: true,
    google: true,
  },
  auth: {
    emailVerification: {
      enabled: false,
    }
  },
  publicRoutes: [
    '/',
    '/login',
    '/register',
    // '/about',
    // '/contact',
    // '/pricing',
    // '/blog',
    // '/forgot-password',
    // '/reset-password',
  ],
  protectedRoutes: [
    '/dashboard',
    '/dashboard/settings',
  ],
  themeSettings: {
    default: 'system' as 'light' | 'dark' | 'system',
  },
  navigation: {
    public: [
      { name: 'Home', href: '/' },
      // { name: 'About', href: '/about' },
      // { name: 'Pricing', href: '/pricing' },
      // { name: 'Contact', href: '/contact' },
      // { name: 'Blog', href: '/blog' },
    ],
    dashboard: [
      { name: 'Dashboard', href: '/dashboard', icon: 'layoutDashboard' },
      { name: 'Settings', href: '/dashboard/settings', icon: 'settings' },
    ],
  },
};
