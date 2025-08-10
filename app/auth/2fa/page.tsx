import { TwoFactorSignIn } from '@/components/auth/forms/two-factor-sign-in';
import { sectionStyles } from '@/styles';

export default function VerifyTwoFactor() {
  return (
    <div className={sectionStyles}>
      <TwoFactorSignIn />
    </div>
  );
}
