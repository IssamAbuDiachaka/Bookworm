import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { IUser, User } from "../models/user.model";
import { registerSchema } from "../validations/auth.validation";
import { loginSchema } from "../validations/auth.validation";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import jwt from "jsonwebtoken";


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

    // Return safe response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        program: newUser.program,
        avatar: newUser.avatar
      }
    });

  } catch (err) {
    console.error("Register Error:", err);
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
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        program: user.program,
        avatar: user.avatar
      }
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

