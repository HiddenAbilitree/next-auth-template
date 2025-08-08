'use client';

import { Passkey } from 'better-auth/plugins/passkey';
import { useState } from 'react';

import { Ellipsis } from '@/components/icons/ellipsis';
import { Save } from '@/components/icons/save';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';

export const PasskeySettings = () => {
  const { data } = authClient.useListPasskeys();

  if (!data) return <p className='p-1'>No Passkeys</p>;

  return (
    <div className='flex flex-col gap-2 rounded-sm border bg-secondary/20 p-1'>
      {data.map((passkey, i) => (
        <>
          <PasskeyItem key={passkey.id} passkey={passkey} />
          {i < data.length - 1 && <hr />}
        </>
      ))}
    </div>
  );
};

const PasskeyItem = ({ passkey }: { passkey: Passkey }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(passkey.name);
  const [input, setInput] = useState(``);
  const reset = () => {
    setInput(``);
    setEditing(false);
  };
  return (
    <div className='flex items-center justify-between p-1' key={passkey.id}>
      <span className='flex items-center gap-1'>
        {editing ?
          <>
            <span className='flex'>
              <Input
                autoFocus
                className='rounded-r-none'
                onChange={(e) => {
                  setInput(e.currentTarget.value);
                }}
                onKeyDown={(e) => {
                  if (e.key !== `Enter`) return;

                  void authClient.passkey.updatePasskey({
                    id: passkey.id,
                    name: e.currentTarget.value,
                  });
                  setName(input);
                  reset();
                }}
                value={input}
              />
              <Button
                className='rounded-l-none border-l-0'
                onClick={() => {
                  void authClient.passkey.updatePasskey({
                    id: passkey.id,
                    name: input,
                  });
                  setName(input);
                  reset();
                }}
                variant='outline'
              >
                <Save />
              </Button>
            </span>
            <Button onClick={reset} size='sm' variant='ghost'>
              Cancel
            </Button>
          </>
        : (name ?? `Passkey`)}
      </span>
      <span className='flex items-center gap-2'>
        {`Created at ${passkey.createdAt
          .toLocaleString(`en-US`, {
            day: `2-digit`,
            hour: `numeric`,
            hour12: true,
            minute: `2-digit`,
            month: `2-digit`,
            year: `2-digit`,
          })
          .replace(`,`, ``)}`}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button className='group' size='icon' variant='ghost'>
              <Ellipsis className='text-muted-foreground group-hover:text-primary' />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end' side='bottom'>
            <DropdownMenuItem
              onClick={() => {
                setEditing(true);
              }}
            >
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await authClient.passkey.deletePasskey({ id: passkey.id });
              }}
              variant='destructive'
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    </div>
  );
};
