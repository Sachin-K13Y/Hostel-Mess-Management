import Complaint from "../models/complaint.model.js";

export const createComplaint = async (req, res) => {
  try {
    const { category, description, roomNumber } = req.body;

    const complaint = await Complaint.create({
      user: req.user.id,
      category,
      description,
      roomNumber,
    });

    return res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    return res.json(complaints);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    return res.json(complaints);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    complaint.status = status;
    await complaint.save();

    return res.json({
      message: "Status updated successfully",
      complaint,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
