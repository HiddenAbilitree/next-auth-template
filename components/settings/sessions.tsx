'use client';
import type { Session } from 'better-auth';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Trash } from '@/components/icons/trash';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { authClient } from '@/lib/auth-client';
import { formatTime } from '@/utils/time';

export const Sessions = () => {
  const [sessions, setSessions] = useState<null | Session[]>();
  const router = useRouter();
  const { data: currentSession, error } = authClient.useSession();

  useEffect(() => {
    const setData = async () => {
      const { data } = await authClient.listSessions();
      setSessions(data);
    };
    void setData();
  }, []);

  if (error) {
    router.push(`/`);
    return;
  }

  return (
    <Table className='bg-secondary/60'>
      <TableHeader>
        <TableRow className='bg-secondary'>
          <TableHead scope='col'>IP</TableHead>
          <TableHead scope='col'>Created At</TableHead>
          <TableHead scope='col'>Expires At</TableHead>
          <TableHead scope='col'>User Agent</TableHead>
          <TableHead scope='col'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions?.map((session) => (
          <SessionRow key={session.id} session={session} />
        ))}
      </TableBody>
    </Table>
  );
};

const SessionRow = ({ session }: { session: Session }) => (
  <TableRow className='not-last-of-type:border-b' key={session.id}>
    <TableCell>
      {session.ipAddress && session.ipAddress.length > 0 ?
        session.ipAddress
      : `None`}
    </TableCell>
    <TableCell>{formatTime(session.createdAt)}</TableCell>
    <TableCell>{formatTime(session.expiresAt)}</TableCell>
    <TableCell>{session.userAgent}</TableCell>
    <TableCell>
      <Button
        onClick={() => {
          void authClient.revokeSession({ token: session.token });
          if (currentSession?.session.token === session.token)
            router.push(`/auth/sign-in`);
        }}
        size='icon'
        variant='ghost'
      >
        <Trash />
      </Button>
    </TableCell>
  </TableRow>
);
