import * as React from 'react';
import {
  Html,
  Button,
  Text,
  Section,
  Img,
  Row,
  Column,
  Link,
} from '@react-email/components';

import { Header, Footer } from './components';

export function VerifyEmail({ url, token }: { url: string; token: string }) {
  return (
    <Html lang='en'>
      <Section className='rounded-md bg-zinc-100 outline'>
        <Header />
        <Section className='m-4'>
          <Button>Verify Email</Button>
        </Section>
        <Footer />
      </Section>
    </Html>
  );
}
