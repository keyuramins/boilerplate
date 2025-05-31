# Next.js Boilerplate with Supabase Auth & Stripe Billing

This is a Next.js boilerplate designed to quickly start a new project with pre-configured Supabase authentication, Stripe billing and subscription management, and a clean, component-driven architecture using the App Router.

## Features

- **Next.js App Router:** Server-rendered pages with component-driven architecture.
- **Supabase Authentication:** Pre-configured email/password authentication flows (Login, Register, Forgot Password, Reset Password).
- **Stripe Billing & Subscriptions:** Examples for creating checkout sessions, managing subscriptions via the customer portal, and handling webhooks for subscription status updates.
- **Protected Routes:** Middleware example for protecting routes based on authentication status.
- **Modular Components:** UI components using shadcn/ui and feature-specific components organized by route.
- **TypeScript:** Full type safety across the codebase.
- **Code Quality:** ESLint, Prettier, and pre-commit hooks configured for consistent formatting and linting.
- **Environment Variable Management:** Clear separation and usage of environment variables.
- **Optimized Data Fetching:** Examples of server-side data fetching patterns.

## Getting Started

Follow these steps to get your project running:

1. **Clone this repository:**
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env.local` file in the project root.
   - Add the required environment variables (see Configuration section below).
4. **Run locally:**
   ```bash
   npm run dev
   ```

## Configuration (Environment Variables)

Create a `.env.local` file at the root of your project and add the following environment variables. Replace the placeholder values with your actual keys and URLs.

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY # Used for admin actions (e.g., in webhooks)

# Stripe
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY # Server-side secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY # Client-side publishable key
STRIPE_WEBHOOK_SECRET=whsec_YOUR_STRIPE_WEBHOOK_SECRET # Webhook signing secret

# Application
NEXT_PUBLIC_SITE_URL=http://localhost:3000 # Your site's URL (for redirects)
NEXT_PUBLIC_SITENAME=YourAppName # Your application's name

# AWS S3 (Example Data Source - Remove if not using)
AWS_REGION=YOUR_AWS_REGION
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
AWS_S3_BUCKET=YOUR_S3_BUCKET
S3_PEOPLE_KEY=YOUR_S3_PEOPLE_KEY # Example specific to original project
S3_VALUES_KEY=YOUR_S3_VALUES_KEY # Example specific to original project
S3_GOVERNMENT_KEY=YOUR_S3_GOVERNMENT_KEY # Example specific to original project
S3_BELIEFS_KEY=YOUR_S3_BELIEFS_KEY # Example specific to original project
```

## Project Structure

```
app/
  api/             # API Routes (Stripe webhooks, account actions)
    account/
      delete/
        cancel-delete/
        route.ts     # Cancel account deletion route
      route.ts       # Account deletion route
    stripe/
      checkout/
        route.ts     # Create Stripe checkout session route
      portal/
        route.ts     # Create Stripe billing portal session route
      webhook/
        route.ts     # Stripe webhook handler
  dashboard/       # User dashboard page
  forgot-password/ # Forgot password page
  login/           # Login page
  profile/         # User profile page
  register/        # Register page
  reset-password/  # Reset password page
  subscription/    # Subscription management page
  sitemap.xml/     # Sitemap route
  favicon.ico/
  page.tsx         # Landing page
  layout.tsx       # Root layout
  globals.css
  loading.tsx      # Loading page
  not-found.tsx    # Not found page

components/
  auth/            # Authentication components (forms)
  dashboard/       # Dashboard specific components
  layout/          # Layout components (e.g., Header, Footer, Landing page content)
  profile/         # Profile specific components
  subscription/    # Subscription specific components
  ui/              # Shared shadcn/ui components
  SubscribeButton.tsx # Example component
  ClientThemeProvider.tsx # Theme provider
  Footer.tsx       # Footer component
  Header.tsx       # Header component
  Layout.tsx       # App layout component
  ProtectedLayout.tsx # Layout for protected routes
  ThemeSwitcher.tsx # Theme switcher component

lib/               # Server-side libraries and utility functions
  auth.ts          # Authentication helpers
  stripeClient.ts  # Stripe server-side client and helpers
  supabaseBrowserClient.ts # Supabase browser client
  supabaseClient.ts # Supabase server client
  types.ts         // TODO: Add generic types for the boilerplate here
  utils.ts         # General utilities (cn function)

utils/             # Client-side utilities
  parseCsv.ts      # CSV parsing utility

public/            # Static assets
  robots.txt
  site.webmanifest
  window.svg
  globe.svg
  gtm.js
  og-image.png     # Example og:image (replace with your own)
  favicon-16x16.png # Example favicon (replace with your own)
  favicon-32x32.png # Example favicon (replace with your own)
  file.svg
  android-chrome-512x512.png # Example favicon (replace with your own)
  apple-touch-icon.png # Example favicon (replace with your own)
  android-chrome-192x192.png # Example favicon (replace with your own)

.env
.gitignore
components.json
eslint.config.js
middleware.ts
next-env.d.ts
next.config.ts
package-lock.json
package.json
postcss.config.js
README.md
tailwind.config.ts
tasks.md
tsconfig.json
```

## Extending the Boilerplate

- **Adding New Features:** Create new routes in `app/`, corresponding components in `components/`, and server logic in `lib/` or API routes in `app/api/`. Follow the server-component pattern where possible.
- **Customizing UI:** Modify components in `components/ui/` or create new ones. Adjust `tailwind.config.ts` for theme changes.
- **Integrating Different Auth/Billing:** Replace the implementations in `lib/auth.ts`, `lib/supabaseClient.ts`, `lib/stripeClient.ts`, and the relevant API routes and middleware.
- **Updating Data Source:** Replace the example data fetching logic in `lib/` and any components/pages that rely on it.

## License

This project is licensed under the MIT License.
