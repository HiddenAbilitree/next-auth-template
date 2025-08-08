'use client';

import { DialogTrigger } from '@radix-ui/react-dialog';
import { Passkey } from 'better-auth/plugins/passkey';
import { useState } from 'react';

import { Pencil } from '@/components/icons/pencil';
import { X } from '@/components/icons/x';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { formatTime } from '@/utils/time';

export const PasskeySettings = () => {
  const { data } = authClient.useListPasskeys();

  return (
    <table className='table-auto overflow-clip rounded-sm bg-secondary/50 p-1 text-left'>
      <thead className='border-b bg-secondary text-xs font-semibold text-foreground/70 uppercase'>
        <tr>
          <th className='px-6 py-3' scope='col'>
            Name
          </th>
          <th className='px-6 py-3' scope='col'>
            ID
          </th>
          <th className='px-6 py-3' scope='col'>
            Created At
          </th>
          <th className='px-6 py-3' scope='col'>
            Actions
          </th>
        </tr>
      </thead>
      <tbody className='text-sm'>
        {data && data.length > 0 ?
          data.map((passkey) => (
            <PasskeyItem
              key={`${passkey.id}-${passkey.name}`}
              passkey={passkey}
            />
          ))
        : <tr className='not-last-of-type:border-b'>
            <td className='px-6 py-3'>No Passkeys</td>
          </tr>
        }
      </tbody>
    </table>
  );
};

const PasskeyItem = ({ passkey }: { passkey: Passkey }) => {
  const [name, setName] = useState(passkey.name);
  const [input, setInput] = useState(``);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  return (
    <tr className='not-last-of-type:border-b' key={passkey.id}>
      <td className='px-6 py-3'>{name ?? `Passkey`}</td>
      <td className='px-6 py-3'>{passkey.id}</td>
      <td className='px-6 py-3'>{formatTime(passkey.createdAt)}</td>
      <td className='px-4 py-3'>
        <Dialog onOpenChange={setRenameOpen} open={renameOpen}>
          <Button asChild size='icon' variant='ghost'>
            <DialogTrigger>
              <Pencil />
            </DialogTrigger>
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename Passkey</DialogTitle>
              <DialogDescription>
                Old name: {name ?? `Passkey`}
              </DialogDescription>
              <Input
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
                  setInput(``);
                  setRenameOpen(false);
                }}
                placeholder='Passkey Name'
                value={input}
              />
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setRenameOpen(false)} variant='outline'>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  void authClient.passkey.updatePasskey({
                    id: passkey.id,
                    name: input,
                  });
                  setName(input);
                  setInput(``);
                  setRenameOpen(false);
                }}
              >
                Rename
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog onOpenChange={setDeleteOpen} open={deleteOpen}>
          <Button asChild size='icon' variant='ghost'>
            <DialogTrigger>
              <X />
            </DialogTrigger>
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Passkey</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete passkey {name ?? `Passkey`}?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setDeleteOpen(false)} variant='outline'>
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  await authClient.passkey.deletePasskey({ id: passkey.id });
                  setDeleteOpen(false);
                }}
                variant='destructive'
              >
                Confirm Deletion
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  );
};
