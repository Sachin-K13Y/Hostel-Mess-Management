import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getMyNotifications,
  markAsRead,
  wardenBroadcast
} from "../controllers/notification.controller.js";

const router = express.Router();

// Student sees their notifications
router.get("/", protect, getMyNotifications);

// Mark notification as read
router.put("/:id/read", protect, markAsRead);

// Warden broadcast notification to all students
router.post("/broadcast", protect, wardenBroadcast);

export default router;
