import API from "./axios";

export const createComplaintAPI = (data) => API.post("/complaints", data);
export const getMyComplaintsAPI = () => API.get("/complaints/my");
export const getAllComplaintsAPI = () => API.get("/complaints/all");
export const updateComplaintStatusAPI = (id, status) =>
  API.put(`/complaints/${id}/status`, { status });
