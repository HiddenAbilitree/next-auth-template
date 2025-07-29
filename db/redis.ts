import { createClient } from 'redis';

// change as needed
const client = createClient({});

await client.connect();

export { client };
