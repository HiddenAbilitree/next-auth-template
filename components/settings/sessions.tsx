'use client';
import { Session } from 'better-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Trash } from '@/components/icons/trash';
import { Button } from '@/components/ui/button';
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
    <table className='table-auto overflow-clip rounded-sm bg-secondary/50 p-1 text-left'>
      <thead className='border-b bg-secondary text-xs font-semibold text-foreground/70 uppercase'>
        <tr>
          <th className='px-6 py-3' scope='col'>
            IP
          </th>
          <th className='px-6 py-3' scope='col'>
            Created At
          </th>
          <th className='px-6 py-3' scope='col'>
            Expires At
          </th>
          <th className='px-6 py-3' scope='col'>
            User Agent
          </th>
          <th className='px-6 py-3' scope='col'>
            Actions
          </th>
        </tr>
      </thead>

      {sessions?.map((session) => (
        <tr className='not-last-of-type:border-b' key={session.id}>
          <td className='px-6 py-3'>
            {session.ipAddress && session.ipAddress.length > 0 ?
              session.ipAddress
            : `None`}
          </td>
          <td className='px-6 py-3'>{formatTime(session.createdAt)}</td>
          <td className='px-6 py-3'>{formatTime(session.expiresAt)}</td>
          <td className='px-6 py-3'>{session.userAgent}</td>
          <td className='px-6 py-3'>
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
          </td>
        </tr>
      ))}
    </table>
  );
};
