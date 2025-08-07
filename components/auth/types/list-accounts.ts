import { RequestContext } from 'better-auth/react';

export interface Account {
  accountId: string;
  createdAt: string;
  id: string;
  provider: string;
  scopes: string[];
  updatedAt: string;
}

export interface Data {
  data: Account[];
  request: RequestContext;
  response: Response;
}
