import jwt from "jsonwebtoken";

import UserModel from "../model/user.js";

async function authenticate(req, res, next) {
  try {
    // Get Token from Request
    const accessToken = req.headers?.authorization?.split(" ")[1] || "";
    if (!accessToken) {
      return res.status(401).json({
        error: true,
        message: "Access Denied. Please go to login.",
      });
    }
    // Validate Access Token
    const isValid = jwt.verify(accessToken, process.env.JWT_SECRET_KEY); // Decoded Payload
    if (!isValid) {
      return res.json({
        error: true,
        message: "Access Denied. Please Contact admin",
      });
    }

    // Check User Exists
    const isUserFound = await UserModel.find({ email: isValid.email });
    if (!isUserFound) {
      return res.json({
        error: true,
        message: "Unauthorized User. Please go to register",
      });
    }

    // Forward request to nextHandler
    req.user = isValid.email;
    next();
  } catch (error) {
    console.log(error);
  }
}

export default authenticate;
