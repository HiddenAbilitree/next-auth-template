'use server';
// import { createTransport } from 'nodemailer';
import nodemailer from 'nodemailer';
import { render } from '@react-email/components';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST as string,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME as string,
    pass: process.env.SMTP_PASSWORD as string,
  },
});

export async function sendEmail({
  mailHtml,
  from,
  to,
  subject,
}: {
  mailHtml: React.JSX.Element;
  from: string;
  to: string;
  subject: string;
}) {
  const emailHtml = await render(mailHtml);

  await transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: emailHtml,
  });
}
