'use server';

/* CHANGEME */
// For SES
// import { SendEmailCommand, SESv2Client } from '@aws-sdk/client-sesv2';
import { render } from '@react-email/components';
import { createTransport } from 'nodemailer';
import { JSX } from 'react';

// SMTP
const transporter = createTransport({
  auth: {
    pass: process.env.SMTP_PASSWORD,
    user: process.env.SMTP_USERNAME,
  },
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
});

// SES
// const sesClient = new SESv2Client({
//   apiVersion: `2010-12-01`,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
//   },
//   region: process.env.AWS_REGION as string,
// });

// const transporter = createTransport({
//   SES: { SendEmailCommand, sesClient },
// });

export const sendEmail = async ({
  from,
  mailHtml,
  subject,
  to,
}: {
  from: string;
  mailHtml: JSX.Element;
  subject: string;
  to: string;
}) => {
  const emailHtml = await render(mailHtml);

  await transporter.sendMail({
    from: from,
    html: emailHtml,
    subject: subject,
    to: to,
  });
};
