# Configuration System

This directory contains all the configuration files for the SaaS website boilerplate. The configuration system is designed to be easily customizable and maintainable.

## Files

- `site.ts`: Contains all site-wide settings including navigation, marketing content, and theme settings
- `env.ts`: Contains environment-specific settings and feature flags
- `index.ts`: Exports all configuration files

## Usage

### Site Configuration

The `siteConfig` object contains all the static configuration for your website. You can modify it to customize:

- Site name and description
- Navigation items
- Marketing content (hero section, features, pricing)
- Dashboard navigation
- Authentication settings
- Theme settings

Example:
```typescript
import { siteConfig } from "@/config";

// Access site name
console.log(siteConfig.name);

// Access navigation items
console.log(siteConfig.mainNav);

// Access theme settings
console.log(siteConfig.theme.primaryColor);
```

### Environment Configuration

The `envConfig` object contains all environment-specific settings. These settings are controlled through environment variables.

Example:
```typescript
import { envConfig } from "@/config";

// Check if analytics is enabled
if (envConfig.analytics.enabled) {
  // Initialize analytics
}

// Access API settings
console.log(envConfig.api.baseUrl);
```

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Analytics
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_GA_ID=your-ga-id
NEXT_PUBLIC_POSTHOG_API_KEY=your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=your-posthog-host

# Feature Flags
NEXT_PUBLIC_ENABLE_BLOG=true
NEXT_PUBLIC_ENABLE_DOCS=true
NEXT_PUBLIC_ENABLE_BILLING=true

# Rate Limiting
RATE_LIMIT_ENABLED=true
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000
```

## Adding New Configuration

To add new configuration:

1. Create a new file in the `config` directory
2. Export your configuration object
3. Add the export to `config/index.ts`
4. Update this README with documentation for the new configuration 