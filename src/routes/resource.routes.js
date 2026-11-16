import { Router } from "express";
import createResource from "../controllers/resource.controller.js";

const router = Router()

router.post("/create",createResource)

export default router;
