'use client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function Loading() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='flex w-100 flex-col gap-5 rounded-md border bg-card p-4 shadow-sm'>
        <div className='flex w-full flex-col gap-3.5'>
          <h1 className='w-full text-xl font-semibold'>Welcome Back</h1>
          <Separator />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Email</Label>
          <Skeleton className='h-8 w-full'></Skeleton>
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Password</Label>
          <Skeleton className='h-8 w-full'></Skeleton>
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Confirm Password</Label>
          <Skeleton className='h-8 w-full'></Skeleton>
        </div>
        <Button type='submit'>Sign Up</Button>
        <span>
          Already have an account? Sign in{' '}
          <Link href='/auth/signin' className='underline hover:font-medium'>
            here
          </Link>
          .
        </span>
      </div>
    </div>
  );
}
