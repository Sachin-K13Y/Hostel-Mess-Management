import Notification from "../models/notification.model.js";

export const sendNotification = async (userId, title, message) => {
  try {
    await Notification.create({
      user: userId,
      title,
      message
    });
  } catch (error) {
    console.error("Error sending notification:", error.message);
  }
};
