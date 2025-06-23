import { ErrorContext } from 'better-auth/react';
import { toast } from 'sonner';

export const handleError = (
  context: ErrorContext,
  toastId: string | number,
  error?: string,
) => {
  toast.error(error ?? 'Error', {
    id: toastId,
    description: context.error.message,
  });
};
