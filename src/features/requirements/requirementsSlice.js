import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  requirements: [],
  status: "idle",
  error: null,
};
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const fetchRequirements = createAsyncThunk(
  "requirements/fetchRequirements",
  async () => {
    const response = await api.get("/requirements");
    return response.data;
  }
);


const requirementsSlice = createSlice({
  name: "requirements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequirements.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRequirements.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.requirements = action.payload;
        state.status = "idle";
      })
      .addCase(fetchRequirements.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default requirementsSlice.reducer;
