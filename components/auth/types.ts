import { type } from 'arktype';

export const Email = type('string.email').configure({
  message: 'Must be a valid email address.',
});

export const NewPassword = type('8<=string<=1024').configure({
  message: (ctx) =>
    `Must be at least 8 characters long. (Currently ${ctx.actual || 0})`,
});

export const OTP = type('string>=6').configure({
  message: 'Must be 6 characters long.',
});

export const TwoFactorFormSchema = type({
  otp: OTP,
  trust: 'boolean',
});

export const EmailForm = type({ email: Email });

export const PasswordFormSchema = type({
  password: 'string',
});
