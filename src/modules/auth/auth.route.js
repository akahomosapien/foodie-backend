import express from "express";
import { signIn, signout, signUp } from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/signout", signout);

export default authRouter;
