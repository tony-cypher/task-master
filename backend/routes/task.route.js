import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createTask } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createTask);

export default router;
