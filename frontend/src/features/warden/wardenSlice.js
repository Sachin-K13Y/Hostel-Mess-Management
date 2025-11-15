import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWardenSummaryAPI, getWardenRecentAPI } from "../../api/wardenApi";

export const fetchWardenSummary = createAsyncThunk(
  "warden/summary",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getWardenSummaryAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to load dashboard summary");
    }
  }
);

export const fetchWardenRecent = createAsyncThunk(
  "warden/recent",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getWardenRecentAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to load activity");
    }
  }
);

const wardenSlice = createSlice({
  name: "warden",
  initialState: {
    summary: null,
    recent: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchWardenSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWardenSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchWardenSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchWardenRecent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWardenRecent.fulfilled, (state, action) => {
        state.loading = false;
        state.recent = action.payload;
      })
      .addCase(fetchWardenRecent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wardenSlice.reducer;
