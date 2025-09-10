import { Google } from '@/components/icons/google';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export const GoogleOAuth = () => (
  <Button
    onClick={() => {
      void authClient.signIn.social({
        provider: `google`,
      });
    }}
    type='button'
    variant='white'
  >
    <Google />
    Sign In with Google
  </Button>
);
