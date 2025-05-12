# Next.js Supabase Boilerplate

A modern, full-stack web application boilerplate built with Next.js, Supabase, and Tailwind CSS. This project provides a robust foundation for building scalable web applications with authentication, real-time features, and a beautiful UI powered by Radix UI components.

## 🚀 Features

- **Next.js 15+** - React framework with server-side rendering and static site generation
- **Supabase Integration** - Backend as a Service with:
  - Authentication
  - Real-time subscriptions
  - PostgreSQL database
- **Modern UI Components** - Comprehensive set of Radix UI components
- **Styling** - Tailwind CSS with animations and theming support
- **Type Safety** - Full TypeScript support
- **Form Handling** - React Hook Form with Zod validation
- **Payment Integration** - Stripe payment processing capabilities
- **Loading States** - NextJS Toploader for smooth page transitions
- **Theme Support** - Dark/Light mode with next-themes

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- (Optional) Stripe account for payment features

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nextjs-supabase-boilerplate.git
cd nextjs-supabase-boilerplate
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Supabase and Stripe (if using) credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key (optional)
```

4. Setup Supabase
```bash
    // Init Supabase
    npx supabase init

    // Login to Supabase CLI
    npx supabase login
    
    // Link your project
    npx supabase link --project-ref <project-id> // Get your supabase project id fromm supabase dashboard settings.
    
    // Creates the API table if they don't exist
    npx supabase db push

    // Optional, Generate types
    npx supabase gen types typescript --project-id <project-id> > types/supabase.ts
``

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

## 📁 Detailed Directory Structure

### `app/` - Next.js App Router
```
app/
├── (protected)/               # Authentication required routes
│   ├── dashboard/            # Dashboard pages
│   │   ├── billings/        # Billing management
│   │   ├── settings/        # User settings
│   │   ├── loading.tsx      # Dashboard loading state
│   │   └── page.tsx         # Main dashboard page
│   └── layout.tsx           # Protected routes layout
├── (public)/                # Public access routes
│   ├── auth/               # Authentication pages
│   ├── (marketing)/       # Marketing/landing pages
│   ├── api/               # API routes
│   └── (auth)/            # Auth-specific routes
├── layout.tsx              # Root layout component
├── icon.ico               # Application favicon
└── globals.css            # Global styles
```

### `components/` - React Components
```
components/
├── ui/                    # Shadcn UI Components
│   ├── accordion.tsx     # Accordion component
│   ├── alert-dialog.tsx  # Alert dialog component
│   ├── avatar.tsx        # Avatar component
│   ├── button.tsx        # Button component
│   ├── calendar.tsx      # Calendar component
│   ├── card.tsx          # Card component
│   ├── dialog.tsx        # Dialog component
│   ├── dropdown-menu.tsx # Dropdown menu component
│   ├── form.tsx          # Form component
│   ├── input.tsx         # Input component
│   └── ... (40+ UI components)
├── public/               # Public page components
├── providers/           # Context providers
├── landing/            # Landing page components
├── dashboard/          # Dashboard components
├── common/             # Shared components
└── auth/               # Auth components
```

### `lib/` - Utilities and Services
```
lib/
├── stripe/              # Stripe Integration
│   ├── client.ts       # Stripe client setup
│   ├── config.ts       # Stripe configuration
│   └── types.ts        # Stripe-related types
├── supabase/           # Supabase Integration
│   ├── client.ts      # Supabase client setup
│   └── server.ts      # Server-side Supabase utilities
└── utils.ts            # General utility functions
```

### `config/` - Configuration Files
```
config/
├── themes/             # Theme configuration
├── landing.config.ts   # Landing page settings
└── project.config.ts   # Project-wide settings
```

### Root Configuration Files
```
├── next.config.js      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS settings
├── tsconfig.json       # TypeScript configuration
├── postcss.config.js   # PostCSS settings
├── components.json     # UI components settings
└── .eslintrc.json     # ESLint rules
```

## 📝 Key Files Description

### App Router Files
- `app/layout.tsx`: Root layout with providers and global components
- `app/(protected)/layout.tsx`: Layout for authenticated routes with auth checks
- `app/(protected)/dashboard/page.tsx`: Main dashboard interface
- `app/(protected)/dashboard/loading.tsx`: Dashboard loading state component

### Component Files
- **UI Components**: Complete set of shadcn/ui components with Radix UI primitives
- **Auth Components**: Authentication forms, providers, and guards
- **Dashboard Components**: Admin interface and user dashboard components
- **Landing Components**: Marketing and public-facing page components

### Integration Files
- **Supabase Integration**:
  - `lib/supabase/client.ts`: Browser-side Supabase client
  - `lib/supabase/server.ts`: Server-side Supabase utilities

- **Stripe Integration**:
  - `lib/stripe/client.ts`: Stripe client configuration
  - `lib/stripe/config.ts`: Stripe API settings
  - `lib/stripe/types.ts`: Stripe-related TypeScript types

### Configuration Files
- `next.config.js`: Next.js build and runtime configuration
- `tailwind.config.ts`: Tailwind CSS theme and plugin setup
- `tsconfig.json`: TypeScript compiler options
- `components.json`: shadcn/ui components configuration
- `postcss.config.js`: PostCSS plugins configuration
- `.eslintrc.json`: ESLint rules and settings

## 🔧 Available Scripts

- `npm run dev` - Run development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 UI Components

This boilerplate includes a comprehensive set of pre-styled components from Radix UI:

- Accordion
- Alert Dialog
- Avatar
- Checkbox
- Dialog
- Dropdown Menu
- Form components
- Navigation Menu
- And many more...

## 🔐 Authentication

Authentication is handled through Supabase, providing:
- Email/Password authentication
- Social authentication (configurable)
- Protected routes
- Session management

## 💳 Stripe Integration

The boilerplate includes Stripe integration for handling payments:
- Secure payment processing
- Subscription management
- Payment element components

## 🎯 Best Practices

- Type-safe development with TypeScript
- Responsive design with Tailwind CSS
- Component-based architecture
- Server-side rendering optimization
- Secure authentication flow
- Environment variable management

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔧 Environment Configuration

### Supabase Setup

#### 1. Create Supabase Project
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project" and fill in the details:
   - Organization (create if needed)
   - Project name
   - Database password (save this securely)
   - Region (choose closest to your users)
   - Pricing plan

#### 2. Get Supabase Credentials
1. In your Supabase project dashboard:
   - Go to Project Settings > API
   - You'll find two essential keys:
     - Project URL (`NEXT_PUBLIC_SUPABASE_URL`)
     - Project API Key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)

#### 3. Authentication Setup
1. Go to Authentication > Settings in Supabase Dashboard
2. Configure auth providers:
   - Email auth (enabled by default)
   - Add social providers if needed:
     - Google OAuth:
       - Create project in [Google Cloud Console](https://console.cloud.google.com)
       - Enable Google OAuth API
       - Configure OAuth consent screen
       - Create OAuth 2.0 Client ID
       - Add authorized redirect URI: `https://<your-project>.supabase.co/auth/v1/callback`
     - GitHub OAuth:
       - Go to GitHub Developer Settings
       - Create new OAuth App
       - Add callback URL: `https://<your-project>.supabase.co/auth/v1/callback`
       - Copy Client ID and Client Secret
3. Configure email templates:
   - Confirmation emails
   - Reset password emails
   - Magic link emails
4. Configure auth settings:
   - Site URL
   - Redirect URLs (for auth callbacks)
   - User session length
   - Security settings (password strength, etc.)

### Stripe Integration

#### 1. Create Stripe Account
1. Sign up at [Stripe Dashboard](https://dashboard.stripe.com)
2. Complete account verification

#### 2. Get Stripe API Keys
1. In Stripe Dashboard:
   - Go to Developers > API keys
   - Get test mode keys:
     - Publishable key (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`)
     - Secret key (`STRIPE_SECRET_KEY`)

#### 3. Configure Stripe Products
1. Go to Products > Add Product
2. Create your pricing tiers:
   ```typescript
   // Example product configuration in config/stripe.ts
   export const STRIPE_PRODUCTS = {
     BASIC: {
       name: 'Basic Plan',
       price_id: 'price_xxx', // Add your Stripe price ID
       features: ['Feature 1', 'Feature 2']
     },
     PRO: {
       name: 'Pro Plan',
       price_id: 'price_yyy',
       features: ['All Basic features', 'Feature 3', 'Feature 4']
     }
   };
   ```

#### 4. Setup Stripe Webhook
1. Install Stripe CLI for local development:
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Windows (using Scoop)
   scoop install stripe
   ```

2. Login to Stripe CLI:
   ```bash
   stripe login
   ```

3. Configure webhook endpoints:

   For Development:
   ```bash
   # Start local webhook forwarding
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   - Copy the webhook signing secret provided by the CLI
   - Add it to your `.env.local` as `STRIPE_WEBHOOK_SECRET_LOCAL`

   For Production:
   1. Go to Developers > Webhooks in Stripe Dashboard
   2. Click 'Add endpoint'
   3. Enter your production webhook URL: `https://your-domain.com/api/webhooks/stripe`
   4. Select events to listen to:
      ```
      checkout.session.completed
      customer.subscription.created
      customer.subscription.updated
      customer.subscription.deleted
      customer.updated
      invoice.payment_succeeded
      invoice.payment_failed
      ```
   5. Click 'Add endpoint'
   6. Reveal the signing secret and add it to your production environment as `STRIPE_WEBHOOK_SECRET`

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret # For production
STRIPE_WEBHOOK_SECRET_LOCAL=your_local_webhook_secret # For development

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_VERCEL_URL=your_vercel_url # For production
```

### Additional Configuration

#### Supabase Type Generation
1. Install Supabase CLI:
   ```bash
   npm install supabase --save-dev
   ```

2. Generate types:
   ```bash
   npx supabase gen types typescript --project-id your-project-id > types/supabase.ts
   ```

#### Production Deployment
1. Add all environment variables to your hosting platform
2. Update webhook endpoints in Stripe Dashboard
3. Verify Supabase authentication settings and redirect URLs
4. Test payment flow in test mode before going live 
