import express from "express";
import cors from "cors";
import repositoriesRouter from "./routes/repositories";
import chartsRouter from "./routes/charts";
import "dotenv/config";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/repositories", repositoriesRouter);
app.use("/api/charts", chartsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running, PORT ${PORT}`);
});
