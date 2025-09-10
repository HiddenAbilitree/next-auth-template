import { Discord } from '@/components/icons/discord';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export const DiscordOAuth = () => (
  <Button
    onClick={() => {
      void authClient.signIn.social({
        callbackURL: `/`,
        provider: `discord`,
      });
    }}
    type='button'
    variant='blurple'
  >
    <Discord />
    Sign In with Discord
  </Button>
);
