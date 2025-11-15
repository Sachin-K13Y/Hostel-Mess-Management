import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStudentSummary } from "../../api/studentApi";

export const getStudentSummary = createAsyncThunk(
  "student/summary",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchStudentSummary();  // <-- Must return full response
      return res; // Return entire response so frontend can access all fields
    } catch (err) {
      return rejectWithValue("Failed to load student dashboard");
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    summary: null,      // <-- Contains dashboard data
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudentSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentSummary.fulfilled, (state, action) => {
        state.loading = false;

        // Backend returns dashboard summary object
        state.summary = action.payload;  
      })
      .addCase(getStudentSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
