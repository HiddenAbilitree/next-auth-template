import * as React from 'react';
import {
  Html,
  Head,
  Container,
  Button,
  Text,
  Section,
  Tailwind,
} from '@react-email/components';

import { Header, Footer } from './components';

export function VerifyEmail({ url, token }: { url: string; token: string }) {
  return (
    <Html lang='en'>
      <Head>
        <title>Verify your email</title>
        <style>
          {`
            @import url('https://cdn.staticdelivr.com/gfonts/css2?family=Geist');
            *{
            font-family: 'Geist', sans;
            }`}
        </style>
      </Head>
      <Tailwind>
        <Container className='w-96 rounded-md bg-zinc-100 outline'>
          <Header />
          <Section className='my-4 text-center'>
            <Button
              className='box-border rounded-md bg-black px-4 py-3 text-center font-semibold text-white'
              href={url}
            >
              Verify Email
            </Button>
            <Text>Or enter this token: {token}</Text>
            <Text className='text-sm font-light text-black/40'>
              If you did not request this, you can safely ignore this email.
            </Text>
          </Section>
        </Container>
      </Tailwind>
    </Html>
  );
}
