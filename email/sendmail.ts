import nodemailer, { Transporter } from 'nodemailer';

const emailconfig: Transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface SendEmailParams {
  to: string;
  subject: string;
  body: string;
}

export async function sendEmail({ to, subject, body }: SendEmailParams): Promise<nodemailer.SentMessageInfo> {
  const info = await emailconfig.sendMail({
    from: `Eco-mama <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    html: body,
  });

  return info;
}

export default sendEmail;
