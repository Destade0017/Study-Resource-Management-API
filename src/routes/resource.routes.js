import { Router } from "express";
import { createResource, getAllResource } from "../controllers/resource.controller.js";

const router = Router()

router.post("/create",createResource)
router.get("/", getAllResource)

export default router;
