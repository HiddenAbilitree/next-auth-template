import { configure } from 'arktype/config';

configure({
  keywords: {
    'string.email': { message: 'Must be a valid email address.' },
  },
});
