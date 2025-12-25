import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //Read JWT from "jwt" cookie
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(404);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(404);
    throw new Error("Not authorized, No token.");
  }
});

//Check for the Admin
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(404).send("Not authorized as admin.");
  }
};

export { authenticate, authorizeAdmin };
