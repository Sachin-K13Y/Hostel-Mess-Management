import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import notificationRoutes from "./routes/notification.route.js";
import fakeIotRoutes from "./routes/fakeIot.routes.js";
import fakeMlRoutes from "./routes/fakeMl.routes.js";



dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES PLACEHOLDERS
import authRoutes from "./routes/auth.routes.js";
import complaintRoutes from "./routes/complaint.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import wardenRoutes from "./routes/warden.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/warden", wardenRoutes);
app.use("/api/iot", fakeIotRoutes);
app.use("/api/mess", fakeMlRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Hello world" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
