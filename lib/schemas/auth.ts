import './config';
import { type } from 'arktype';

const Password = type.string
  .atLeastLength(8)
  .atMostLength(128)
  .configure({
    message: (ctx) =>
      `Must be at least 8 characters long. (Currently ${ctx.actual || 0})`,
  });

// ripped straight from https://arktype.io/docs/expressions#narrow
// configure errors https://arktype.io/docs/configuration#errors
const signUp = type({
  email: 'string.email',
  password: Password,
  confirmPassword: 'string',
}).narrow((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    return ctx.reject({
      message: 'Must be identical to password.',
      path: ['confirmPassword'],
    });
  }
  return true;
});

const signIn = type({
  email: 'string.email',
  password: 'string',
});

export { signUp, signIn };
