import {
  Html,
  Head,
  Container,
  Button,
  Text,
  Section,
  Tailwind,
} from '@react-email/components';

import { Header } from '@/components/email/Header';

export function VerifyDeletion({ url, token }: { url: string; token: string }) {
  return (
    <Html lang='en'>
      <Head>
        <title>Verify account deletion</title>
        {/* Something something font is broken see here https://github.com/resend/react-email/issues/501
         * This is scuffed workaround
         * */}
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
              className='box-border rounded-md bg-red-500 px-4 py-3 text-center font-semibold text-white'
              href={url}
            >
              Delete my account
            </Button>
            <Text className='text-sm font-light text-black/40'>
              If you did not request this, please change your password immediately.
            </Text>
          </Section>
        </Container>
      </Tailwind>
    </Html>
  );
}
