import express from "express";
import dotenv from "dotenv";
import connection from "./Config/dbConfig.js";
import userRouter from "./Routes/userRoutes.js";
import errorHandler from "./Middleware/errorHandler.js";
import todoRouter from "./Routes/todoRoutes.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/user/task", todoRouter);
app.use(errorHandler);
const port = process.env.port || 5000;
app.listen(port, () => {
  console.log("Server running on port: ", port);
});
connection();
