import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { matchedData } from "express-validator";

// User Controller
import UserModel from "../model/user.js";

// 1. To create user account
export const handleToCreateAccount = async (req, res) => {
  try {
    const { name, email, password } = matchedData(req); // success result

    // Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check User Exists
    const isUserFound = await UserModel.find({ email });
    if (!isUserFound && isUserFound.length === 0) {
      return res.json({
        error: true,
        message: "User already exists. Please go to login.",
      });
    }
    // Store User
    const now = new Date();
    const payload = {
      name,
      email,
      password: hashedPassword,
      createAt: now,
    };
    const newUser = await UserModel.insertOne(payload);

    if (!newUser) {
      return res.json({
        error: true,
        message: "failed to create user account. Try later",
      });
    }

    res.json({ error: false, message: "User Account Created..." });
  } catch (error) {
    console.log(error);
    return;
  }
};

// 2. To authenticate user.
export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Field validation
    if (!email || !password) {
      return res.json({
        error: true,
        message: "Please fill all required fields.",
      });
    }

    // Check user exists
    const isUserExits = await UserModel.find({ email });
    if (!isUserExits) {
      return res.json({
        error: true,
        message: "No User Found. Please go to register.",
      });
    }

    // Generate Secret Token : Access Token
    const payload = { email };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    // Respond to client
    res.json({
      error: false,
      message: "User LoggedIn Success.",
      accessToken,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async (req, res) => {
  const email = req.user;
  console.log(email);
  try {
    // Get User Details
    if (!email) {
      return res.json({
        error: true,
        message: "Unauthorized user. Please go to login",
      });
    }
    // User Validation
    const user = await UserModel.findOne({ email }); // null
    console.log(user);
    const userDTO = { name: user.name, email: user.email }; // DTO : USER
    if (!user) {
      throw new Error({
        error: true,
        message: "No User Found. Please go to register.",
      });
    }

    // Respond to User Req.
    res.json({ error: false, message: "fetch user profile", user: userDTO });
  } catch (error) {
    if (error) {
      res.json(error);
      return;
    }
  }
};
