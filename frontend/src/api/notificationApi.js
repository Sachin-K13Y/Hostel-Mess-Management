import API from "./axios";

export const getNotificationsAPI = () => API.get("/notifications");
export const markAsReadAPI = (id) => API.put(`/notifications/${id}/read`);
export const sendBroadcastAPI = (data) =>
  API.post("/notifications/broadcast", data);
