import { Button, Text } from '@react-email/components';

import { EmailLayout } from '@/components/email/email-layout';

export const VerifyPasswordChange = ({ url }: { url: string }) => (
  <EmailLayout
    preview='If you did not request this, please change your password immediately.'
    title='Password Change Request'
  >
    <Button
      className='box-border rounded-md bg-red-500 px-4 py-3 text-center font-semibold text-white'
      href={url}
    >
      Change my password
    </Button>
    <Text className='text-xs font-light text-black/40'>
      If you did not request this, your account may be compromised. Change your
      password immediately to secure your account.
    </Text>
  </EmailLayout>
);
