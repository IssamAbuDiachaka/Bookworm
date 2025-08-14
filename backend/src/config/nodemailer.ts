import nodemailer from 'nodemailer';
import {config} from 'dotenv';
config();

// create nodemailer transporter usin SMTP settings from environment variables
export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false for others
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  
  // Helper to send emails
  export const sendEmail = async (to: string, subject: string, html: string) => {
    await transporter.sendMail({
      from: `"Bookworm" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      html
    });
  };