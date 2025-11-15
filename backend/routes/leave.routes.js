import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

import {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus
} from "../controllers/leave.controller.js";

const router = express.Router();

// STUDENT ROUTES
router.post("/", protect, allowRoles("student"), applyLeave);
router.get("/my", protect, allowRoles("student"), getMyLeaves);

// WARDEN ROUTES
router.get("/all", protect, allowRoles("warden"), getAllLeaves);
router.put("/:id/status", protect, allowRoles("warden"), updateLeaveStatus);

export default router;
