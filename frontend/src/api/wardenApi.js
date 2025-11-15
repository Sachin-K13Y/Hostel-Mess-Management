import API from "./axios";

export const getWardenSummaryAPI = () => API.get("/warden/summary");
export const getWardenRecentAPI = () => API.get("/warden/recent");
