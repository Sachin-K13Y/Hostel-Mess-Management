import API from "./axios";

export const applyLeaveAPI = (data) => API.post("/leave", data);
export const getMyLeavesAPI = () => API.get("/leave/my");
export const getAllLeavesAPI = () => API.get("/leave/all");

export const updateLeaveStatusAPI = (id, status, wardenComment) =>
  API.put(`/leave/${id}/status`, { status, wardenComment });
