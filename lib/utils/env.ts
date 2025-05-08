/// <reference types="node" />

/**
 * Environment variable configuration and validation
 */

/**
 * Required environment variables
 */
const requiredEnvs = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_APP_URL',
] as const;

/**
 * Optional environment variables that become required in production
 */
const productionRequiredEnvs = [
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
] as const;

type RequiredEnvVar = (typeof requiredEnvs)[number];
type ProductionRequiredEnvVar = (typeof productionRequiredEnvs)[number];
type EnvVar = RequiredEnvVar | ProductionRequiredEnvVar;

/**
 * Get a sanitized environment variable
 * @param key - The environment variable key
 * @param required - Whether the variable is required
 * @returns The sanitized environment variable value
 * @throws Error if required variable is missing
 */
function getEnvVar(key: EnvVar, required = true): string {
  const value = process.env[key];
  
  if (!value) {
    if (required) {
      throw new Error(`Environment variable ${key} is not set`);
    }
    return '';
  }

  return value.trim();
}

/**
 * Validate all required environment variables
 * @throws Error if any required variable is missing
 */
export function validateEnv(): void {
  const missingEnvs: string[] = [];

  // Check required envs
  requiredEnvs.forEach((key) => {
    if (!process.env[key]) {
      missingEnvs.push(key);
    }
  });

  // Check production required envs
  if (process.env.NODE_ENV === 'production') {
    productionRequiredEnvs.forEach((key) => {
      if (!process.env[key]) {
        missingEnvs.push(key);
      }
    });
  }

  if (missingEnvs.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missingEnvs.join('\n')}`
    );
  }
}

/**
 * Environment variables object with typed and sanitized values
 */
export const env = {
  // Supabase
  supabaseUrl: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  supabaseServiceRoleKey: getEnvVar('SUPABASE_SERVICE_ROLE_KEY', process.env.NODE_ENV === 'production'),

  // Stripe
  stripeSecretKey: getEnvVar('STRIPE_SECRET_KEY', process.env.NODE_ENV === 'production'),
  stripePublishableKey: getEnvVar('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', process.env.NODE_ENV === 'production'),
  stripeWebhookSecret: getEnvVar('STRIPE_WEBHOOK_SECRET', process.env.NODE_ENV === 'production'),

  // App
  appUrl: getEnvVar('NEXT_PUBLIC_APP_URL'),
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const; 