import { ErrorContext } from 'better-auth/react';
import { toast } from 'sonner';

export const handleError = (
  context: ErrorContext,
  toastId: number | string,
  error?: string,
) => {
  toast.error(error ?? `Error`, {
    description: context.error.message,
    id: toastId,
  });
};
