import {
  Section,
  Heading,
  Text,
  Row,
  Column,
  Img,
  Link,
} from '@react-email/components';
export function Header() {
  return (
    <Section>
      <Row>
        <Column className='flex items-center gap-4 p-4'>
          <Img alt='React Email logo' className='size-12' src='/favicon.ico' />
          <Heading as='h1' className='text-xl font-semibold'>
            Name
          </Heading>
        </Column>
      </Row>
    </Section>
  );
}
