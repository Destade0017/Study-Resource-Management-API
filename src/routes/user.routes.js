import { Router } from "express";
import { createUser, loginUser, getAllUsers } from "../controllers/user.controller.js";
import { get } from "mongoose";

const router = Router();

router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/", getAllUsers)

export default router;
