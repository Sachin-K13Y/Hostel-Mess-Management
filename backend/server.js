import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES PLACEHOLDERS
import authRoutes from "./routes/auth.js";
import complaintRoutes from "./routes/complaint.js";
import leaveRoutes from "./routes/leave.js";
import wardenRoutes from "./routes/warden.js";

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/warden", wardenRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
