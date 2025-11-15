import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createComplaintAPI,
  getMyComplaintsAPI,
  getAllComplaintsAPI,
  updateComplaintStatusAPI,
} from "../../api/complaintApi";

// =============================
// CREATE COMPLAINT (Student)
// =============================
export const createComplaint = createAsyncThunk(
  "complaint/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createComplaintAPI(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create complaint"
      );
    }
  }
);

// =============================
// GET MY COMPLAINTS (Student)
// =============================
export const fetchMyComplaints = createAsyncThunk(
  "complaint/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMyComplaintsAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to load complaints");
    }
  }
);

// =============================
// GET ALL COMPLAINTS (Warden)
// =============================
export const fetchAllComplaints = createAsyncThunk(
  "complaint/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllComplaintsAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to load all complaints");
    }
  }
);

// =============================
// UPDATE COMPLAINT STATUS (Warden)
// =============================
export const updateComplaintStatus = createAsyncThunk(
  "complaint/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await updateComplaintStatusAPI(id, status);
      return res.data.complaint;
    } catch (err) {
      return rejectWithValue("Status update failed");
    }
  }
);

// =============================
// SLICE
// =============================
const complaintSlice = createSlice({
  name: "complaint",
  initialState: {
    complaints: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ----------------------------------
      // Fetch my complaints (student)
      // ----------------------------------
      .addCase(fetchMyComplaints.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload;
      })
      .addCase(fetchMyComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ----------------------------------
      // Create complaint
      // ----------------------------------
      .addCase(createComplaint.fulfilled, (state, action) => {
        state.complaints.unshift(action.payload.complaint);
      })

      // ----------------------------------
      // Warden: fetch all complaints
      // ----------------------------------
      .addCase(fetchAllComplaints.fulfilled, (state, action) => {
        state.complaints = action.payload;
      })

      // ----------------------------------
      // Warden: update complaint status
      // ----------------------------------
      .addCase(updateComplaintStatus.fulfilled, (state, action) => {
        const index = state.complaints.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) state.complaints[index] = action.payload;
      });
  },
});

export default complaintSlice.reducer;
