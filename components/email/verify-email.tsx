import { Button, Text } from '@react-email/components';

import { EmailLayout } from '@/components/email/email-layout';

export const VerifyEmail = ({ url }: { url: string }) => (
  <EmailLayout
    preview='To finalize your account creation, please verify your email'
    title='Verify Your Email'
  >
    <Button
      className='box-border rounded-md bg-black px-4 py-3 text-center font-semibold text-white'
      href={url}
    >
      Verify Email
    </Button>
    <Text className='text-sm text-black'>
      Please verify your email within 24 hours to activate your account.
    </Text>
    <Text className='text-xs font-light text-black/40'>
      If you did not request this, you can safely ignore this email.
    </Text>
  </EmailLayout>
);
