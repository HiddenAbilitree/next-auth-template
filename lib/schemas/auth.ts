import '@/lib/schemas/config';
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
const SignUpFormSchema = type({
  email: 'string.email',
  password: Password,
  confirmPassword: 'string',
}).narrow((data, ctx) => {
  return (
    data.password === data.confirmPassword ||
    ctx.reject({
      message: 'Must be identical to password.',
      path: ['confirmPassword'],
    })
  );
});

const SignInFormSchema = type({
  email: 'string.email',
  password: 'string',
});

const TwoFactorFormSchema = type({
  otp: 'string.numeric==6',
});

export { SignUpFormSchema, SignInFormSchema, TwoFactorFormSchema };
