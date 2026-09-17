import express from "express";
import { sendOtp, signIn, signout, signUp } from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/signout", signout);
authRouter.post("/send-otp", sendOtp);

export default authRouter;
