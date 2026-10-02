import express from "express";
import {
  sendOtp,
  signIn,
  signout,
  signUp,
  verifyOtp,
} from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/signout", signout);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);

export default authRouter;
