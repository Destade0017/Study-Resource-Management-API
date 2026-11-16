import { Router } from "express";
import { createResource, getAllResource, deleteResource } from "../controllers/resource.controller.js";

const router = Router()

router.post("/create", createResource)
router.get("/", getAllResource)
router.delete("/:id", deleteResource)

export default router;
