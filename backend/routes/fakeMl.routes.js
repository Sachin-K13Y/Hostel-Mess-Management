import express from "express";
import { getFakeFoodPrediction } from "../controllers/fakeMl.controller.js";

const router = express.Router();

router.get("/predict", getFakeFoodPrediction);

export default router;
