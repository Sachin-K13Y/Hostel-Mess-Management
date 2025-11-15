import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  applyLeaveAPI,
  getMyLeavesAPI,
  getAllLeavesAPI,
  updateLeaveStatusAPI,
} from "../../api/leaveApi";

// =============================
// STUDENT: APPLY LEAVE
// =============================
export const applyLeave = createAsyncThunk(
  "leave/apply",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await applyLeaveAPI(formData);
      return res.data; // { leave: {...} }
    } catch (err) {
      return rejectWithValue("Leave request failed");
    }
  }
);

// =============================
// STUDENT: FETCH MY LEAVES
// =============================
export const fetchMyLeaves = createAsyncThunk(
  "leave/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMyLeavesAPI();
      return res.data; // list
    } catch (err) {
      return rejectWithValue("Failed to load leave history");
    }
  }
);

// =============================
// WARDEN: FETCH ALL LEAVE REQUESTS
// =============================
export const fetchAllLeaves = createAsyncThunk(
  "leave/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllLeavesAPI();
      return res.data; // list
    } catch (err) {
      return rejectWithValue("Failed to fetch leave requests");
    }
  }
);

// =============================
// WARDEN: UPDATE LEAVE STATUS
// =============================
export const updateLeaveStatus = createAsyncThunk(
  "leave/updateStatus",
  async ({ id, status, wardenComment }, { rejectWithValue }) => {
    try {
      const res = await updateLeaveStatusAPI(id, status, wardenComment);
      return res.data.leave;
    } catch (err) {
      return rejectWithValue("Failed to update status");
    }
  }
);

// =============================
// SLICE
// =============================
const leaveSlice = createSlice({
  name: "leave",
  initialState: {
    leaves: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ----------------------------------
      // Student: Fetch My Leaves
      // ----------------------------------
      .addCase(fetchMyLeaves.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves = action.payload;
      })
      .addCase(fetchMyLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ----------------------------------
      // Student: Apply Leave
      // ----------------------------------
      .addCase(applyLeave.fulfilled, (state, action) => {
        state.leaves.unshift(action.payload.leave);
      })

      // ----------------------------------
      // Warden: Fetch All Leaves
      // ----------------------------------
      .addCase(fetchAllLeaves.fulfilled, (state, action) => {
        state.leaves = action.payload;
      })

      // ----------------------------------
      // Warden: Update Leave Status
      // ----------------------------------
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        const index = state.leaves.findIndex(
          (l) => l._id === action.payload._id
        );
        if (index !== -1) state.leaves[index] = action.payload;
      });
  },
});

export default leaveSlice.reducer;
