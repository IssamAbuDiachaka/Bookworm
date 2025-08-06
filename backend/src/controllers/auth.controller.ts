import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { registerSchema } from "../validations/auth.validation";

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
