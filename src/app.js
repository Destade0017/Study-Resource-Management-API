import express from "express";

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

 export default app;
