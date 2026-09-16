import express from "express";
import "dotenv/config";
import errorMiddleware from "./src/middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import authRouter from "#modules/auth/auth.route.js";
import cors from "cors";

const app = express();

//Middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

//Parse JSON -make sure this is before the routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/v1/auth", authRouter);

//error Middleware
app.use(errorMiddleware); //keep this at last

export default app;
