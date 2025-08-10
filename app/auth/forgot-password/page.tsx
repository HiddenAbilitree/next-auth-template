import { ForgotPasswordForm } from '@/components/auth/forms/forgot-password';
import { sectionStyles } from '@/styles';

export default function ForgotPassword() {
  return (
    <div className={sectionStyles}>
      <ForgotPasswordForm />
    </div>
  );
}
