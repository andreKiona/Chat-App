import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUsersSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controllers.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersSidebar); // Get all users for sidebar
router.get("/:id", protectRoute, getMessages); // Get a specific user for sidebar

router.post("/send/:id", protectRoute, sendMessage); // Send a message to a specific user

export default router;
