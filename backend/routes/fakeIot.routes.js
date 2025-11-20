import express from "express";
import { getFakeHeadcount } from "../controllers/fakeIot.controller.js";

const router = express.Router();

router.get("/fake-headcount", getFakeHeadcount);

export default router;
