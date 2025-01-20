import cors from "cors";
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { dbConnection } from "./connection/dbConnect";
import chartsRouter from "./routes/charts";
import repositoriesRouter from "./routes/repositories";
import userRouter from "./routes/users";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/repositories", repositoriesRouter);
app.use("/api/charts", chartsRouter);
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;

dbConnection(app, PORT);
