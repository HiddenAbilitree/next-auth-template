import { createClient } from 'redis';

// change as needed
const client = createClient({});

client.connect();

export { client };
