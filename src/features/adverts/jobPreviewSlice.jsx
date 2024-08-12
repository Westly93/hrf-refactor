// jobAdvertPreviewSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async thunk to fetch job preview data from the API
// export const fetchJobPreviewData = createAsyncThunk('jobAdvertPreview/fetchJobPreviewData', async () => {
//   const response = await fetch(`https://hrm.msu.ac.zw/api/v1/adverts`); // Replace 'YOUR_API_URL' with the actual API endpoint for job preview data
//   const data = await response.json();
//   return data;
// });

// Async thunk to fetch job preview data from the API
export const fetchJobPreviewData = createAsyncThunk('jobAdvertPreview/fetchJobPreviewData', async () => {
    try {
      const response = await fetch('https://hrm.msu.ac.zw/api/v1/requirements'); // Replace 'YOUR_API_URL' with the actual API endpoint for fetching job adverts
      if (!response.ok) {
        throw new Error('Failed to fetch job adverts.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error('Error fetching job adverts:', error.message);
      throw error; // Rethrow the error to let Redux Toolkit handle it
    }
  });


// Async thunk to fetch job requirements from the API
export const fetchJobRequirements = createAsyncThunk(
  'jobAdvertPreview/fetchJobRequirements',
  async (jobPreviewId) => {
    const response = await fetch(`https://hrm.msu.ac.zw/api/v1/requirements/`); // Replace 'YOUR_API_URL' with the actual API endpoint for job requirements
    const data = await response.json();
    return data;
  }
);

const jobAdvertPreviewSlice = createSlice({
  name: 'jobAdvertPreview',
  initialState: {
    jobPreviewData: {},
    requirementsList: [],
    isPublished: false,
  },
  reducers: {
    publishJobAdvert: (state) => {
      state.isPublished = true;
    },
  },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchJobPreviewData.fulfilled, (state, action) => {
//         state.jobPreviewData = action.payload;
//       })
//       .addCase(fetchJobRequirements.fulfilled, (state, action) => {
//         state.requirementsList = action.payload;
//       });
//   },
});

export const { publishJobAdvert } = jobAdvertPreviewSlice.actions;

export default jobAdvertPreviewSlice.reducer;
