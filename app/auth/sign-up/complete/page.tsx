export default function CompleteSignUp() {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-y-2'>
      <h1 className='text-xl font-bold'>Sign Up Successful</h1>
      <p>Please check your inbox and click the link to verify your email.</p>
      <p>You are free to close this page!</p>
      <p className='text-xs text-primary/40'>
        Note: This email will expire in 24 hours. Failure to verify within this
        time will require you to sign up again.
      </p>
    </div>
  );
}
