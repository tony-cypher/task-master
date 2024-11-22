import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createTask,
  getUserTasks,
  updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/user/:username", protectRoute, getUserTasks);
router.post("/create", protectRoute, createTask);
router.post("/update/:id", protectRoute, updateTask);

export default router;
