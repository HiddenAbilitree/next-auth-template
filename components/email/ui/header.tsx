import {
  Column,
  Heading,
  Img,
  Link,
  Row,
  Section,
} from '@react-email/components';

export const Header = () => (
  <Section>
    <Row>
      <Column className='flex items-center gap-3 p-4'>
        {/* CHANGEME */}
        <Link href=''>
          <Img alt='Logo' className='size-12' src='/favicon.ico' />
        </Link>
        <Heading as='h1' className='text-2xl font-semibold'>
          {/* CHANGEME */}
        </Heading>
      </Column>
    </Row>
  </Section>
);
