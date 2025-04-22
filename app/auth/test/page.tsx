import { render } from '@react-email/components';
import { VerifyEmail } from '@/components/email/Verify';
export default async function Page() {
  const content = await render(VerifyEmail({ url: 'Test', token: 'test' }), {
    pretty: true,
  });
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div
        className='max-w-[1300px]'
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
