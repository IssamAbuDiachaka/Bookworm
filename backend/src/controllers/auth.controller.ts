import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { IUser, User } from "../models/user.model";
import { registerSchema } from "../validations/auth.validation";
import { loginSchema } from "../validations/auth.validation";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "@utils/sendVerificationEmail";


export const registerUser = async (req: Request, res: Response) => {
  try {
    // Validate incoming data
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors
      });
    }

    const { name, email, password, program } = parsed.data;

    //  Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      program
    });
    

    //  Send verification link
    await sendVerificationEmail(newUser);

    // Return response
    return res.status(201).json({

      message: "Registration successful. Please check your email to verify your account.",

      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        program: newUser.program,
        avatar: newUser.avatar
      },
       verificationsent: true
    });
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    // Check if expired
    if (!user.verificationTokenExpires || user.verificationTokenExpires < new Date()) {
      return res.status(400).json({ message: "Verification link has expired" });
    }

    // Mark verified
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

    return res.json({ message: "Account verified successfully. You can now log in." });
  } catch (err) {
    console.error("Verify Error:", err);
    return res.status(500).json({ message: "Internal server error, from verify user" });
  }
};

export const resendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If already verified, no need to resend
    if (user.isVerified) {
      return res.status(400).json({ message: "Account is already verified" });
    }

    // Send new verification email
    await sendVerificationEmail(user);

    return res.json({
      message: "Verification email resent. Please check your inbox."
    });

  } catch (err) {
    console.error("Resend verification error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    // Validate input
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors
      });
    }

    const { email, password } = parsed.data;

    // Find user
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "user is not verified"});
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());

    // Set HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Return access token & user info
    return res.status(200).json({
      
      message: "Login successful",
      
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        program: user.program,
        avatar: user.avatar
      },
      accessToken
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    // Get refresh token from cookie
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    // Verify token
    let payload: any;
    try {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    } catch {
      return res.status(403).json({ message: "Invalid or expired refresh token" });
    }

    // Check if user still exists
    const user = await User.findById(payload.userId).exec();
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken(user._id.toString(), user.role);

    // Rotate refresh token
    const newRefreshToken = generateRefreshToken(user._id.toString());
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // Return new access token
    return res.status(200).json({
      accessToken: newAccessToken
    });

  } catch (err) {
    console.error("Refresh token error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

