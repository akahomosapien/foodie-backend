import express from "express";
import "dotenv/config";
import errorMiddleware from "./src/middlewares/error.middleware";

const app = express();

//Middlewares

app.use(errorMiddleware); //keep this at last

export default app;
