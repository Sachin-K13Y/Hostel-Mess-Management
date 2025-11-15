import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNotificationsAPI,
  markAsReadAPI,
  sendBroadcastAPI,
} from "../../api/notificationApi";

// =============================
// FETCH NOTIFICATIONS
// =============================
export const fetchNotifications = createAsyncThunk(
  "notification/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getNotificationsAPI();
      return res.data;
    } catch {
      return rejectWithValue("Failed to load notifications");
    }
  }
);

// =============================
// MARK NOTIFICATION AS READ
// =============================
export const markNotificationRead = createAsyncThunk(
  "notification/read",
  async (id, { rejectWithValue }) => {
    try {
      const res = await markAsReadAPI(id);
      return res.data.notif;
    } catch {
      return rejectWithValue("Failed to mark notification read");
    }
  }
);

// =============================
// SEND BROADCAST (Warden)
// =============================
export const sendBroadcast = createAsyncThunk(
  "notification/broadcast",
  async ({ title, message }, { rejectWithValue }) => {
    try {
      const res = await sendBroadcastAPI({ title, message });
      return res.data;
    } catch {
      return rejectWithValue("Broadcast failed");
    }
  }
);

// =============================
// SLICE
// =============================
const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
    broadcastSuccess: false,
  },
  reducers: {
    resetBroadcastSuccess: (state) => {
      state.broadcastSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder

      // ----------------------------------
      // Fetch Notifications
      // ----------------------------------
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;

        state.unreadCount = action.payload.filter((n) => !n.read).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ----------------------------------
      // Mark Notification as Read
      // ----------------------------------
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(
          (n) => n._id === action.payload._id
        );

        if (index !== -1) {
          state.notifications[index].read = true;
        }

        state.unreadCount = state.notifications.filter((n) => !n.read).length;
      })

      // ----------------------------------
      // Send Broadcast
      // ----------------------------------
      .addCase(sendBroadcast.pending, (state) => {
        state.loading = true;
        state.broadcastSuccess = false;
      })
      .addCase(sendBroadcast.fulfilled, (state) => {
        state.loading = false;
        state.broadcastSuccess = true;
      })
      .addCase(sendBroadcast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.broadcastSuccess = false;
      });
  },
});

export const { resetBroadcastSuccess } = notificationSlice.actions;
export default notificationSlice.reducer;
