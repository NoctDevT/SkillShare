import { z } from "zod";

// Validation on Application variables 

export const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.string().default('development'),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required').url({
      message: 'DATABASE_URL must be a valid URL',
    }),
    DATABASE_URL_DOCKER: z.string().min(1, 'DATABASE_URL is required').url({
      message: 'DATABASE_URL must be a valid URL',
    }),
    AUTH0_SECRET: z.string().min(1, 'AUTH0_SECRET is required'),
    AUTH0_BASE_URL: z.string().url({
      message: 'AUTH0_BASE_URL must be a valid URL',
    }),
    AUTH0_CLIENT_ID: z.string().min(1, 'AUTH0_CLIENT_ID is required'),
    AUTH0_ISSUER_BASE_URL: z.string().url({
      message: 'AUTH0_ISSUER_BASE_URL must be a valid URL',
    }),
  });

export type EnvSchemaType = z.infer<typeof envSchema>
  