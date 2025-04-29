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
export const SignUpFormSchema = type({
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

export const SignInFormSchema = type({
  email: 'string.email',
  password: 'string',
});

export const TwoFactorFormSchema = type({
  otp: 'string>=6',
});

export const ForgotPasswordFormSchema = type({ email: 'string.email' });

export const ResetPasswordFormSchema = type({
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

export const PasswordFormSchema = type({
  password: 'string',
});
