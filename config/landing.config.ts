// Landing page configuration
export const landingConfig = {
  // Global variant that applies to all sections unless overridden
  globalVariant: 'grid-dots', // 'grid-matrix', 'grid-dots', 'grid-bubbles', 'neon', 'gradient', 'waves'
  
  // Order of sections to be displayed
  sectionOrder: ['hero', 'features', 'statistics', 'testimonials', 'pricing', 'faq', 'cta'],
  
  // Configuration for individual sections
  sections: {
    hero: {
      variant: 'grid-matrix', // Inherits globalVariant if empty
      alignment: 'left', // 'left', 'center', 'right'
      background: 'gradient', // 'gradient', 'image', 'video', 'color'
      showImage: true,
      imagePosition: 'right', // 'left', 'right', 'bottom', 'top'
      ctaButtons: 2, // Number of CTA buttons
      content: {
        badge: {
          text: 'Production-Ready SaaS Boilerplate',
          variant: 'primary' // 'primary', 'secondary', 'outline'
        },
        title: 'Next.js + Supabase + ShadCN UI',
        description: 'A production-ready Next.js boilerplate with Supabase Auth and ShadCN UI. Build your SaaS app today.',
        buttons: [
          {
            text: 'Get Started',
            href: '/dashboard',
            variant: 'default',
            icon: 'arrowRight'
          },
          {
            text: 'Login',
            href: '/login',
            variant: 'outline'
          }
        ],
        image: {
          src: 'https://images.pexels.com/photos/8439094/pexels-photo-8439094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          alt: 'Dashboard Preview'
        }
      }
    },
    features: {
      variant: 'grid-dots',
      alignment: 'center',
      layout: 'grid', // 'grid', 'list', 'alternating'
      columns: 3, // 1, 2, 3, 4
      showIcons: true,
      iconPosition: 'top', // 'top', 'left'
      features: [
        {
          title: "Authentication",
          description: "Complete authentication system with email/password and Google OAuth",
          icon: "lock"
        },
        {
          title: "Protected Routes",
          description: "Middleware-based route protection to secure your application",
          icon: "shield"
        },
        {
          title: "Dark Mode",
          description: "Built-in dark mode support with system preference detection",
          icon: "moon"
        },
        {
          title: "Responsive Design",
          description: "Fully responsive layouts for all device sizes",
          icon: "smartphone"
        },
        {
          title: "ShadCN UI",
          description: "Beautiful, accessible UI components built with Radix UI and Tailwind",
          icon: "palette"
        },
        {
          title: "TypeScript",
          description: "Full TypeScript support for better development experience",
          icon: "code"
        }
      ]
    },
    statistics: {
      variant: 'grid-matrix',
      alignment: 'center',
      layout: 'row', // 'row', 'grid'
      animate: true,
      stats: [
        { value: '99%', label: 'Customer Satisfaction' },
        { value: '24/7', label: 'Support' },
        { value: '10k+', label: 'Active Users' },
        { value: '50+', label: 'Countries' }
      ]
    },
    testimonials: {
      variant: 'neon',
      alignment: 'center',
      layout: 'carousel', // 'carousel', 'grid', 'masonry'
      autoplay: true,
      testimonials: [
        {
          content: "This boilerplate saved me weeks of development time. Highly recommended!",
          author: "Jane Smith",
          position: "CTO, TechCorp"
        },
        {
          content: "The easiest way to kickstart a SaaS project. Clean code and great documentation.",
          author: "John Doe",
          position: "Lead Developer, StartupX"
        },
        {
          content: "We built our entire product on this foundation. Best decision we made.",
          author: "Alex Johnson",
          position: "Founder, SaaSify"
        }
      ]
    },
    pricing: {
      variant: 'neon',
      alignment: 'center',
      layout: 'cards', // 'cards', 'table', 'toggle'
      showToggle: true,
      toggleOptions: ['Monthly', 'Yearly'],
      highlight: 1 // Index of the plan to highlight (0-based)
    },
    faq: {
      variant: 'grid-bubbles',
      alignment: 'center',
      layout: 'accordion', // 'accordion', 'grid'
      columns: 2,
      faqs: [
        {
          question: "How do I get started?",
          answer: "Sign up for an account and follow our quickstart guide to deploy your first project."
        },
        {
          question: "Is there a free tier?",
          answer: "Yes, we offer a generous free tier with all core features included."
        },
        {
          question: "Can I cancel anytime?",
          answer: "Absolutely. All plans come with no-commitment cancellation."
        },
        {
          question: "Do you offer support?",
          answer: "Yes, all paid plans include dedicated support via email and chat."
        }
      ]
    },
    cta: {
      variant: 'gradient',
      alignment: 'center',
      background: 'dark', // 'dark', 'light', 'color', 'image'
      ctaButtons: 1
    }
  }
};
