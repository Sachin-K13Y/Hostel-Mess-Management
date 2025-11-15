import Complaint from "../models/complaint.model.js";
import Leave from "../models/leave.model.js";

export const getDashboardSummary = async (req, res) => {
  try {
    // Complaints summary
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: "Pending" });
    const inProgressComplaints = await Complaint.countDocuments({ status: "In-Progress" });
    const resolvedComplaints = await Complaint.countDocuments({ status: "Resolved" });

    // Leave summary
    const totalLeaves = await Leave.countDocuments();
    const pendingLeaves = await Leave.countDocuments({ status: "Pending" });
    const approvedLeaves = await Leave.countDocuments({ status: "Approved" });
    const rejectedLeaves = await Leave.countDocuments({ status: "Rejected" });

    return res.json({
      complaints: {
        total: totalComplaints,
        pending: pendingComplaints,
        inProgress: inProgressComplaints,
        resolved: resolvedComplaints,
      },
      leaves: {
        total: totalLeaves,
        pending: pendingLeaves,
        approved: approvedLeaves,
        rejected: rejectedLeaves,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const recentComplaints = await Complaint.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentLeaves = await Leave.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    return res.json({
      recentComplaints,
      recentLeaves,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
