import Leave from "../models/leave.model.js";
import { sendNotification } from "../utils/sendNotification.js";

export const applyLeave = async (req, res) => {
  try {
    const { fromDate, toDate, reason, destinationAddress } = req.body;

    const leave = await Leave.create({
      user: req.user.id,
      fromDate,
      toDate,
      reason,
      destinationAddress
    });

    return res.status(201).json({
      message: "Leave request submitted successfully",
      leave
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.json(leaves);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.json(leaves);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateLeaveStatus = async (req, res) => {
  try {
    const { status, wardenComment } = req.body;

    const leave = await Leave.findById(req.params.id);
    if (!leave)
      return res.status(404).json({ message: "Leave request not found" });

    leave.status = status;
    leave.wardenComment = wardenComment || "";
    await leave.save();

    // notify student
    const title = "Leave Status Updated";
    const message = `Your leave request has been ${status}.`;

    await sendNotification(leave.user, title, message);

    return res.json({
      message: "Leave status updated successfully",
      leave
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

