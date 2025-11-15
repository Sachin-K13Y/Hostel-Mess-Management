import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";
import {
  getDashboardSummary,
  getRecentActivity
} from "../controllers/warden.controller.js";

const router = express.Router();


router.get("/summary", protect, allowRoles("warden"), getDashboardSummary);
router.get("/recent", protect, allowRoles("warden"), getRecentActivity);

export default router;
