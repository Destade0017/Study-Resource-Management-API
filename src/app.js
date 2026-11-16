import express from "express";
import userRouter from "./routes/user.routes.js";

const app = express();

//middlewares
app.use(express.json())

//basic route
app.get("/", (req, res) => {
  res.send("API is running...")
})

//health route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "App is running smoothly",
    timestamps: new Date().toISOString()
  })
})

//app routes
app.use("/api/v1/users", userRouter)


export default app;
