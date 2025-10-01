/**
 * Schema Utility Functions
 *
 * Helper functions for working with Zod schemas, including
 * validation, error formatting, and type inference utilities.
 */

import { z, ZodError, ZodSchema } from 'zod';

/**
 * Safe parse with formatted error messages
 */
export function safeParse<T extends ZodSchema>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: ValidationError[] } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    errors: formatZodErrors(result.error)
  };
}
/**
 * Validation error structure
 */
interface ValidationError {
  path: string;
  message: string;
  type: string;
  value?: unknown;
}

/**
 * Format Zod errors into user-friendly messages
 */
function formatZodErrors(error: ZodError): ValidationError[] {
  return error.issues.map(issue => ({
    path: issue.path.join('.'),
    message: issue.message,
    type: issue.code,
    value: 'input' in issue ? issue.input : undefined
  }));
}

/**
 * Create a partial version of a schema (all fields optional)
 */
export function createPartialSchema<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T
): z.ZodObject<z.ZodRawShape> {
  const shape: z.ZodRawShape = {};
  for (const key in schema.shape) {
    shape[key] = schema.shape[key].optional();
  }
  return z.object(shape);
}

/**
 * Create a schema with only specified fields required
 */
export function createRequiredSchema<
  T extends z.ZodObject<z.ZodRawShape>,
  K extends keyof T['shape']
>(
  schema: T,
  requiredFields: K[]
): z.ZodObject<z.ZodRawShape> {
  const shape: z.ZodRawShape = {};
  for (const key in schema.shape) {
    const field = schema.shape[key];
    if (field) {
      shape[key] = requiredFields.includes(key as K)
        ? field
        : field.optional();
    }
  }
  return z.object(shape);
}

/**
 * Merge two schemas (right overwrites left)
 */
export function mergeSchemas<
  T extends z.ZodObject<z.ZodRawShape>,
  U extends z.ZodObject<z.ZodRawShape>
>(left: T, right: U): z.ZodObject<z.ZodRawShape> {
  return z.object({ ...left.shape, ...right.shape });
}

/**
 * Create a paginated response schema
 */
export function createPaginatedSchema<T extends ZodSchema>(
  itemSchema: T
): z.ZodObject<{
  data: z.ZodArray<T>;
  meta: z.ZodObject<{
    page: z.ZodNumber;
    per_page: z.ZodNumber;
    total: z.ZodNumber;
    total_pages: z.ZodNumber;
  }>;
}> {
  return z.object({
    data: z.array(itemSchema),
    meta: z.object({
      page: z.number(),
      per_page: z.number(),
      total: z.number(),
      total_pages: z.number()
    })
  });
}
