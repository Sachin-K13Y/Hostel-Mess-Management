import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

import {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
} from "../controllers/complaint.controller.js";

const router = express.Router();

// STUDENT
router.post("/", protect, allowRoles("student"), createComplaint);
router.get("/my", protect, allowRoles("student"), getMyComplaints);

// WARDEN
router.get("/all", protect, allowRoles("warden"), getAllComplaints);
router.put("/:id/status", protect, allowRoles("warden"), updateComplaintStatus);

export default router;
