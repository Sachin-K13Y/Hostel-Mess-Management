import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import complaintReducer from "../features/complaint/complaintSlice";
import leaveReducer from "../features/leave/leaveSlice";
import notificationReducer from "../features/notification/notificationSlice";
import wardenReducer from "../features/warden/wardenSlice";
import studentReducer from "../features/student/studentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    complaint: complaintReducer,
    leave: leaveReducer,
    notification: notificationReducer,
    warden: wardenReducer,
    student: studentReducer,  // <-- correctly added
  },
});

export default store;
