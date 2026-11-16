import { Router } from "express";
import { createResource, updateResource, getAllResource, deleteResource, getOneResource } from "../controllers/resource.controller.js";

const router = Router();

router.post("/create", createResource)
router.get("/", getAllResource)
router.delete("/:id", deleteResource)
router.get("/:id", getOneResource)
router.patch("/:id", updateResource)

export default router;
