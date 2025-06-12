import { SignUpForm } from '@/components/auth/sign-up-form';
export default function SignUp(): Readonly<React.JSX.Element> {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <SignUpForm />
    </div>
  );
}
