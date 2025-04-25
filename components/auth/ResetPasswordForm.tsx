import { Form } from '@/components/ui/form';
import { authClient } from '@/lib/auth-client';
export const ResetPasswordForm = () => {
  const handleSubmit = (data) => { };
  return (
    <Form>
      <form onSubmit={handleSubmit}></form>
    </Form>
  );
};
