import crypto from "crypto";
import { sendEmail } from "../config/nodemailer";
import { User, IUser } from "../models/user.model";

export const sendVerificationEmail = async (user: IUser) => {
  // Generate token
  const token = crypto.randomBytes(32).toString("hex");

  // Set expiry (24 hours from now)
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 24);

  // Save token + expiry to user
  user.verificationToken = token;
  user.verificationTokenExpires = expiryDate;
  await user.save();

  // Build verification link
  const verifyLink = `${process.env.CLIENT_URL}/verify/${token}`;

  // Send email
  await sendEmail(
    user.email,
    "Verify Your Bookworm Account",
    `<p>Hi ${user.name},</p>
     <p>Please verify your account by clicking the link below (valid for 24 hours):</p>
     <a href="${verifyLink}">${verifyLink}</a>
     <p>If you did not register, please ignore this email.</p>`
  );
};
