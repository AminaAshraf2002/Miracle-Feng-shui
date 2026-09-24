import { ZodError } from 'zod';
import { ApiError } from '../utils/ApiError';
import { apiResponse } from '../utils/apiResponse';

export function handleError(error: unknown) {
  if (error instanceof ApiError) {
    return apiResponse.error(error.message, error.statusCode, error.details);
  }

  if (error instanceof ZodError) {
    const formatted = error.issues.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    }));
    return apiResponse.error('Validation error', 400, formatted);
  }

  if (error instanceof Error) {
    console.error('Unhandled server error:', error.message);
    return apiResponse.error(error.message || 'Internal server error', 500);
  }

  return apiResponse.error('An unexpected error occurred', 500);
}
