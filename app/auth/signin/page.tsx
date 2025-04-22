import { SignInForm } from '@/components/auth/SignInForm';

export default function SignIn() {

  /* eslint functional/immutable-data: "error" */

  const arr = [0, 1, 2];

  arr[0] = 4; // <- Modifying an array is not allowed.
  arr.length = 1; // <- Modifying an array is not allowed.
  delete arr[1]; // <- Modifying an existing array is not allowed.
  arr.push(3); // <- Modifying an array is not allowed.

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <SignInForm />
    </div>
  );
}
