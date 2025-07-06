import { Separator } from '@/components/ui/separator';

export const AuthSkeleton = () => (
  <div className='w-100 bg-card flex flex-col gap-4 rounded-md border p-4 shadow-sm'>
    <div className='flex w-full flex-col gap-3.5'>
      <div className='bg-input h-10 w-2/5 animate-pulse rounded-md text-xl font-semibold' />
      <Separator />
    </div>
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <div className='bg-input h-5 w-[15%] animate-pulse rounded-md' />
        <div className='bg-input h-10 w-full animate-pulse rounded-md text-xl font-semibold' />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='bg-input h-5 w-[25%] animate-pulse rounded-md' />
        <div className='bg-input h-10 w-full animate-pulse rounded-md text-xl font-semibold' />
      </div>
      <div className='bg-input h-10 w-full animate-pulse rounded-md text-xl font-semibold' />
    </div>
  </div>
);
