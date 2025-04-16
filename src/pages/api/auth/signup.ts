import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    console.log('Connecting to MongoDB...');
    await dbConnect();
    console.log('MongoDB connected successfully');

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user already exists
    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    console.log('Creating new user...');
    const user = await User.create({
      email,
      name,
      password,
    });

    console.log('User created successfully:', user.email);

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    if (error instanceof Error) {
      return res.status(500).json({ 
        message: "Something went wrong",
        error: error.message 
      });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
} 