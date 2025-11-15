import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import { sendNotification } from "../utils/sendNotification.js";

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    return res.json(notifications);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notif = await Notification.findById(req.params.id);
    if (!notif) return res.status(404).json({ message: "Notification not found" });

    notif.read = true;
    await notif.save();

    return res.json({ message: "Marked as read", notif });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const wardenBroadcast = async (req, res) => {
  try {
    const { title, message } = req.body;

    const students = await User.find({ role: "student" }).select("_id");

    for (const stu of students) {
      await sendNotification(stu._id, title, message);
    }

    return res.json({ message: "Broadcast sent successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
