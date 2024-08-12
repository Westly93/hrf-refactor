import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
//Password Reset Confirm

export const resetPasswordConfirm = createAsyncThunk(
  "resetPasswordConfirm",
  async (formData, thunkAPI) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);
   // console.log(body)

    try {
      const response = await axios.post(
        "https://hrm.msu.ac.zw/api/v1/reset-password",
        body,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
//Password Reset Request
export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (email, thunkAPI) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email });
    //console.log(body)

    try {
      const response = await axios.post(
        "https://hrm.msu.ac.zw/api/v1/forgot-password",
        body,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//User login functionality
export const login = createAsyncThunk("login", async (formData, thunkAPI) => {
  try {
    const response = await api.post("/login", formData);
    await thunkAPI.dispatch(userVerification());
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
     // console.log(error.response.status);
     // console.log(error.response.headers);
      throw new Error(error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
     // console.log(error.request);
      throw new Error(
        "Connection Error, Please check your internet Connection"
      );
    } else {
      // Something happened in setting up the request that triggered an Error
    //  console.log("Error", error.message);
      throw new Error("Error processing request");
    }
  }
});
export const logout = createAsyncThunk("logout", async () => {
  const token = localStorage.getItem("token");
  //console.log(token)
  if (token) {
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch("https://hrm.msu.ac.zw/api/v1/logout", config);
    return response.data;
  }
});
//user registration functionality
export const register = createAsyncThunk(
  "register",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/register", formData);
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
       // console.log(error.response.data.errors);
        throw new Error(error.response.data.errors);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw new Error("No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error("Error processing request");
      }
    }
  }
);
//user verification
export const userVerification = createAsyncThunk(
  "userVerification",
  async () => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        api
          .get("/verify", config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("No token found");
      }
    });
  }
);
export const fetchQualifications = createAsyncThunk(
  "fetchQualifications",
  async () => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        api
          .get("/applicant-qualifications", config)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("No token found");
      }
    });
  }
);
export const fetchExperience = createAsyncThunk("fetchExperience", async () => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      api
        .get("/applicant-experience", config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject("No token found");
    }
  });
});
export const fetchContacts = createAsyncThunk("fetchContacts", async (id) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      api
        .get(`/applicants/${id}`, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject("No token found");
    }
  });
});
export const editExperience = createAsyncThunk(
  "editExperience",
  async (formData, thunkAPI) => {
    try {
      const response = await api.put(
        `/applicant-experience/${formData.id}`,
        formData
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //console.log(error.response.data.errors);
        throw new Error(error.response.data.errors);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw new Error("No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error("Error processing request");
      }
    }
  }
);
export const newExperience = createAsyncThunk(
  "newExperience",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/applicant-experience", formData);
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //console.log(error.response.data.errors);
        throw new Error(error.response.data.errors);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw new Error("No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error("Error processing request");
      }
    }
  }
);
export const editQualification = createAsyncThunk(
  "editQualification",
  async (formData, thunkAPI) => {
    try {
      const response = await api.put(
        `/applicant-qualifications/${formData.id}`,
        formData
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
       // console.log(error.response.data.errors);
        throw new Error(error.response.data.errors);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw new Error("No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error("Error processing request");
      }
    }
  }
);
export const newQualification = createAsyncThunk(
  "newQualification",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/applicant-qualifications", formData);
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //console.log(error.response.data.errors);
        throw new Error(error.response.data.errors);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw new Error("No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error("Error processing request");
      }
    }
  }
);
//user Account activation
export const activateAccount = createAsyncThunk(
  "activateAccount",
  async ({ uid, token }, thunkAPI) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ uid, token });
    try {
      const response = await axios.post(
        "https://hrm.msu.ac.zw/api/v1/activation/",
        body,
        config
      );
      return response.data; // You might handle different data here based on your API response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  qualifications: [],
  contacts: [],
  experience: [],
  user: null,
  status: "idle",
  resetPasswordStatus: null,
  resetPasswordConfirmStatus: null,
  resetPasswordConfirmError: null,
  resetPasswordError: null,
  isAuthenticated: false,
  loginError: null,
  loginStatus: null,
  registerError: null,
  registerStatus: null,
  accountActivationStatus: "idle",
  accountActivationError: null,
  error: null,
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Activate account
      .addCase(activateAccount.pending, (state) => {
        state.accountActivationStatus = "loading";
      })
      .addCase(activateAccount.fulfilled, (state, action) => {
        state.accountActivationStatus = "succeeded";
      })
      .addCase(activateAccount.rejected, (state, action) => {
        state.accountActivationStatus = "failed";
        state.accountActivationError = action.error;
      })
      //reset Password Confirm
      .addCase(resetPasswordConfirm.pending, (state) => {
        state.resetPasswordConfirmStatus = "loading";
      })
      .addCase(resetPasswordConfirm.fulfilled, (state, action) => {
        state.resetPasswordConfirmStatus = "succeeded";
      })
      .addCase(resetPasswordConfirm.rejected, (state, action) => {
        state.resetPasswordConfirmStatus = "failed";
        state.resetPasswordConfirmError = action.error.message;
      })
      //reset password
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordStatus = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordStatus = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordStatus = "failed";
        state.resetPasswordError = action.error.message;
       // console.log(action.error);
      })
      //user login
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        const { token } = action.payload;
        localStorage.setItem("token", token);
        state.user = action.payload;
        state.loginError = null;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginError = action.error.message;
      })
      // user registeration
      .addCase(register.pending, (state) => {
        state.registerStatus = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerStatus = "succeeded";
        const { token } = action.payload;
        localStorage.setItem("token", token);
        state.user = action.payload;
        state.isAuthenticated = true;
        state.registerError = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.registerError = action.error;
      })
      // Verirification
      .addCase(userVerification.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.status = "idle";
      })
      .addCase(userVerification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userVerification.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
      })
      //fetch qualifications
      .addCase(fetchQualifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.qualifications = action.payload;
        state.status = "idle";
      })
      .addCase(fetchQualifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQualifications.rejected, (state, action) => {
        state.status = "failed";
      })
      //fetch experience
      .addCase(fetchExperience.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.experience = action.payload.data;
        state.status = "idle";
      })
      .addCase(fetchExperience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExperience.rejected, (state, action) => {
        state.status = "failed";
      })
      //fetch contacts
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = action.payload;
        state.status = "idle";
      })
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
      })
      //add experience
      .addCase(newExperience.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.experience.push(action.payload.data);
        state.status = "idle";
      })
      .addCase(newExperience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newExperience.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //edit experience
      .addCase(editExperience.fulfilled, (state, action) => {
        const editedExperience = action.payload.data;
        const index = state.experience.findIndex(
          (e) => e.id === editedExperience.id
        );
        if (index !== -1) {
          state.experience[index] = editedExperience;
        }
        state.status = "succeeded";
        state.status = "idle";
      })
      .addCase(editExperience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editExperience.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //add qualification
      .addCase(newQualification.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.qualifications.push(action.payload);
        state.status = "idle";
      })
      .addCase(newQualification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newQualification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //edit qualification
      .addCase(editQualification.fulfilled, (state, action) => {
        const editedQualification = action.payload.data;
        const index = state.qualifications.findIndex(
          (q) => q.id === editedQualification.id
        );
        if (index !== -1) {
          state.qualifications[index] = editedQualification;
        }
        state.status = "succeeded";
        state.status = "idle";
      })
      .addCase(editQualification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editQualification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //user logout
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = false;
        localStorage.removeItem("token");
        Object.assign(state, initialState);
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { checkAuthenticated } = usersSlice.actions;
export default usersSlice.reducer;
