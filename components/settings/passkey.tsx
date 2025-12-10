'use client';

import { Passkey } from '@better-auth/passkey';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useState } from 'react';

import { Pencil } from '@/components/icons/pencil';
import { Trash } from '@/components/icons/trash';
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

export const PasskeySettings = () => {
  const { data } = authClient.useListPasskeys();

  return (
    <Table className='bg-secondary/60'>
      <TableHeader>
        <TableRow className='bg-secondary'>
          <TableHead scope='col'>Name</TableHead>
          <TableHead scope='col'>ID</TableHead>
          <TableHead scope='col'>Created At</TableHead>
          <TableHead scope='col'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length > 0 ?
          data.map((passkey) => (
            <PasskeyRow
              key={`${passkey.id}-${passkey.name}`}
              passkey={passkey}
            />
          ))
        : <TableRow>
            <TableCell>No Passkeys</TableCell>
          </TableRow>
        }
      </TableBody>
    </Table>
  );
};

const PasskeyRow = ({ passkey }: { passkey: Passkey }) => {
  const [name, setName] = useState(passkey.name);
  const [input, setInput] = useState(``);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  return (
    <TableRow key={passkey.id}>
      <TableCell>{name ?? `Passkey`}</TableCell>
      <TableCell>{passkey.id}</TableCell>
      <TableCell>{formatTime(passkey.createdAt)}</TableCell>
      <TableCell className='px-4 text-nowrap'>
        <Dialog onOpenChange={setRenameOpen} open={renameOpen}>
          <Button asChild size='icon' variant='ghost'>
            <DialogTrigger>
              <Pencil />
            </DialogTrigger>
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename Passkey</DialogTitle>
              <DialogDescription className='wrap-anywhere'>
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
              <Trash />
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
      </TableCell>
    </TableRow>
  );
};
