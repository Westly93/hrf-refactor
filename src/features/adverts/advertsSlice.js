import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  adverts: [],
  newAdvertStatus: "idle",
  status: "idle",
  error: null,
  createdAdvert: null,
  singleAdvert: null,
  requirements: [],
  appliedAdverts: [],
  advert: null,
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
//add advert
export const addAdvert = createAsyncThunk(
  "adverts/addAdvert",
  async (formData) => {
    const token = localStorage.getItem("token");

    if (token) {
      const formDataObj = new FormData();
      for (const key in formData) {
        formDataObj.append(key, formData[key]);
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const response = await api.post("/advert", formDataObj, config);
      return response.data;
    } else {
     // console.log("there is no token");
    }
  }
);
//Add requirements
export const addRequirements = createAsyncThunk(
  "advert/requirements",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/advert-requirements", formData);
      return response.data;
    } catch (err) {
      // Use `rejectWithValue` to return an error object with a message
      return rejectWithValue(err.response.data);
      //console.log(err.response.data);
    }
  }
);
//new Requirements
export const newRequirement = createAsyncThunk(
  "advert/newRequirement",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/requirements", formData);
      return response.data;
    } catch (err) {
      // Use `rejectWithValue` to return an error object with a message
      //return rejectWithValue(err.response.data);
      //console.log(err.response.data);
    }
  }
);

//fetch advert detail requirements
export const advertDetailRequirements = createAsyncThunk(
  "advert/details",
  async (id) => {
    try {
      const response = await api.get(`advert/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching advert details");
    }
  }
);
//fetch adverts
export const fetchAdverts = createAsyncThunk(
  "advert/fetchAdverts",
  async () => {
    const response = await api.get("/advert");
    return response.data;
  }
);
//delete advert requirement
export const deleteAdvertRequirement = createAsyncThunk(
  "advert/deleteAdvertRequirement",
  async (id) => {
  //  console.log("The id is", id);
    const response = await api.delete(`/advert-requirements/${id}`);
    //console.log(response.data);
    return response.data;
  }
);
//fetch adverts
export const fetchAdvert = createAsyncThunk(
  "advert/fetchAdvert",
  async (id) => {
    const response = await api.get(`/advert/${id}`);
    return response.data;
  }
);

//fetch applied adverts
export const fetchAppliedAdverts = createAsyncThunk(
  "advert/fetchAppliedAdverts",
  async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await api.get("/applied", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  }
);
//Delete advert
export const deleteAdvert = createAsyncThunk(
  "advert/deleteAdvert",
  async (id) => {
    //console.log("The id is", id);
    const response = await api.delete(`/advert/${id}`);
    return response.data;
  }
);
//Update advert
export const updateAdvert = createAsyncThunk(
  "adverts/updateAdvert",
  async (updatedAdvert) => {
    //console.log(updatedAdvert.id)
    const response = await axios.put(
      `https://hrm.msu.ac.zw/api/v1/advert/${updatedAdvert.id}`,
      updatedAdvert
    );
    return response.data;
  }
);
//Update advert requirement

export const updateAdvertRequirement = createAsyncThunk(
  "advertRequirements/update",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.put(
        "https://hrm.msu.ac.zw/api/v1/advert-requirements/153",
        formData,
        {
          headers: {
            Authorization:
              "Bearer 151|6PFcZmaNhvxHruF9vaRV0Hu1mrLFRKcnTqDuUJBU",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// the slice initialization
const advertsSlice = createSlice({
  name: "adverts",
  initialState,
  reducers: {
    resetAdvertsState(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      //add advert
      .addCase(addAdvert.pending, (state) => {
        state.newAdvertStatus = "loading";
      })
      .addCase(addAdvert.fulfilled, (state, action) => {
        state.newAdvertStatus = "succeeded";
        state.adverts.push(action.payload);
        //const { id } = action.payload;
        state.createdAdvert = action.payload;
      })
      .addCase(addAdvert.rejected, (state, action) => {
        state.newAdvertStatus = "failed";
        state.error = action.error.message;
      })
      //add requirements
      .addCase(addRequirements.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addRequirements.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adverts.push(action.payload);
        //const { id } = action.payload;
        state.requirements.push(action.payload);
        state.status = "idle";
      })
      .addCase(addRequirements.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(advertDetailRequirements.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleAdvert = action.payload;
        state.status = "idle";
      })
      //Fetch adverts
      .addCase(fetchAdverts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data } = action.payload;
        state.adverts = data;
        state.status = "idle";
      })
      //Fetch Applied adverts
      .addCase(fetchAppliedAdverts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appliedAdverts = action.payload?.data?.data;
        state.status = "idle";
      })
      .addCase(fetchAppliedAdverts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //fetch single advert
      .addCase(fetchAdvert.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.advert = action.payload;
        state.requirements = action.payload.advert_requirements;
        state.status = "idle";
      })
      //delete advert
      .addCase(deleteAdvert.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adverts.filter((advert) => advert.id !== action.payload);
        state.status = "idle";
      })
      //new requirement
      .addCase(newRequirement.fulfilled, (state, action) => {
        state.status = "succeeded";
        //state.requirements.push(action.payload)
        //state.status = "idle";
        state.error = null;
      })
      .addCase(newRequirement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      //Update advert
      .addCase(updateAdvert.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedAdvert = action.payload.data;
        const existingAdvert = state.adverts.find(
          (advert) => advert.id === updatedAdvert.id
        );
        if (existingAdvert) {
          Object.assign(existingAdvert, updatedAdvert);
        }
      })
      .addCase(updateAdvert.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //Delete advert requirement
      .addCase(deleteAdvertRequirement.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id } = action.payload;
        state.requirements = state.requirements.filter(
          (req) => req.id !== parseInt(id)
        );
        state.status = "idle";
      })
      .addCase(deleteAdvertRequirement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //Update advert requirement
      .addCase(updateAdvertRequirement.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.status = "idle";
      })

      .addCase(updateAdvertRequirement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { advertAdded, resetAdvertsState } = advertsSlice.actions;
export default advertsSlice.reducer;
