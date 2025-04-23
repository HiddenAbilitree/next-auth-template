import {
  Section,
  Heading,
  Row,
  Column,
  Img,
  Link,
} from '@react-email/components';
export const Header = () => (
  <Section>
    <Row>
      <Column className='flex items-center gap-3 p-4'>
        {/* CHANGEME */}
        <Link href='#'>
          <Img alt='CHANGEME' className='size-12' src='/favicon.ico' />
        </Link>
        <Heading as='h1' className='text-2xl font-semibold'>
          {/* CHANGEME */}
        </Heading>
      </Column>
    </Row>
  </Section>
);
