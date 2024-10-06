import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/user.js";
import taskRouter from "./routes/todo.js"
import forgotPasswordRouter from "./routes/forgotpass.js"

dotenv.config()
const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error: ", err));

app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)
app.use("/api/forgotPassword", forgotPasswordRouter)

app.listen(port, () => console.log(`Listening on localhost:${port}`))