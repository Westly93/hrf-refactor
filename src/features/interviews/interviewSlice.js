import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Async thunk action to fetch interview candidates
export const fetchInterviewCandidates = createAsyncThunk(
  "interview/fetchCandidates",
  async () => {
    try {
      const response = await api.get("/interview-candidates");
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch interview candidates");
    }
  }
);

//=================get interveiw by advert id================
// Async thunk action to fetch interview candidates
export const getInterviewByID = createAsyncThunk(
  "interview/getCandidates",
  async (advertID) => {
    try {
      const response = await api.get(`/interview-candidates/${advertID}`);
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch interview applicants");
    }
  }
);

//====================end of the code==========================

//invite applicant by mail
export const InviteInterviewCandidate = createAsyncThunk(
  "ApplicantInterview/create",
  async ({ application_id, message }, { rejectWithValue }) => {
    try {
      const response = await api.post("/interview-email", {
        application_id: application_id,
        message: message,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  candidates: [],
  interviewApplicants: [],
  inviteInterviewEmail: [],
  loading: false,
  error: null,
};
const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    resetInterviewState(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInterviewCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInterviewCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.candidates = action.payload;
      })
      .addCase(fetchInterviewCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //======get interveiw applicant by id reducrs====
      .addCase(getInterviewByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInterviewByID.fulfilled, (state, action) => {
        state.loading = false;
        state.interviewApplicants = action.payload;
      })
      .addCase(getInterviewByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      ///end code==================================

      //applicant interveiw ApplicantInterview
      .addCase(InviteInterviewCandidate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.inviteInterviewEmail = action.payload;
        state.status = "idle";
      })
      .addCase(InviteInterviewCandidate.rejected, (state, action) => {
        state.status = "fialed";
        state.inviteInterviewEmail = action.payload;
        state.status = "idle";
      });
  },
});
export const { resetInterviewState } = interviewSlice.actions;
export default interviewSlice.reducer;
