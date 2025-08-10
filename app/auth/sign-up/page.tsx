import { SignUpForm } from '@/components/auth/forms/sign-up';
import { sectionStyles } from '@/styles';

export default function SignUp() {
  return (
    <div className={sectionStyles}>
      <SignUpForm />
    </div>
  );
}
