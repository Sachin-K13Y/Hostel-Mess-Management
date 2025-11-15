import API from "./axios";

export const fetchStudentSummary = async () => {
  const res = await API.get("/auth/profile"); // profile gives name/role
  return res.data;
};
