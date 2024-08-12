import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const response = await api.get("/application", config);
      return response.data;
    }
  }
);

//fetching applications scores
// export const fetchApplicationScores = createAsyncThunk(
//   "applications/fetchApplications",
//   async () => {
//     const response = await api.get("/application-scores");
//     return response.data;
//   }
// );

// fetch application by advertid
export const fetchApplicationsAdvert = createAsyncThunk(
  "applicationadverts/fetchApplicationsAdvert",

  async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const response = await api.get(`shortlists/${id}`, config);
      return response.data;
    }
  }
);

export const fetchNationalities = createAsyncThunk(
  "applications/fetchNationalities",
  async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const response = await api.get("/nationality", config);
      return response.data;
    }
  }
);
export const fetchContactTypes = createAsyncThunk(
  "applications/fetchContactTypes",
  async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const response = await api.get("/contact-types", config);
      return response.data;
    }
  }
);
export const fetchMaritalStatus = createAsyncThunk(
  "applications/fetchMaritalStatus",
  async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const response = await api.get("/maritial-status", config);
      return response.data;
    }
  }
);
export const fetchDocumentTypes = createAsyncThunk(
  "applications/fetchDocumentTypes",
  async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const response = await api.get("/document-types", config);
      return response.data;
    }
  }
);

//fetch documents
export const fetchApplicationDocuments = createAsyncThunk(
  "applications/fetchApplicationDocuments",
  async (applicationId) => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };

      // Update the URL to include the applicationId
      const url = `https://hrm.msu.ac.zw/api/v1/application/${applicationId}/document`;

      const response = await api.get(url, config);
      return response.data;
    }
  }
);

//fetch applicant references

//fetch documents
export const fetchApplicationReferences = createAsyncThunk(
  "applications/fetchApplicationReferences",
  async (applicationId) => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };

      // Update the URL to include the applicationId
      const url = `https://hrm.msu.ac.zw/api/v1/application/reference/${applicationId}`;

      const response = await api.get(url, config);
      return response.data;
    }
  }
);
//end fethc applicant references

// export const fetchApplicationDocuments = createAsyncThunk(
//   "applications/fetchApplicationDocuments",
//   async () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       };
//       const response = await api.get("/application-document", config);
//       return response.data;
//     }
//   }
// );

//end fetch documents
export const fetchApplicationScores = createAsyncThunk(
  "applications/fetchApplicationScores",
  async () => {
    try {
      const response = await api.get("/preshortlists");
      if (response.status === 200) {
        if (response.data.length === 0) {
          return { data: [], message: "No Shortlists For This Advert." };
        }
        return response.data;
      } else {
        throw new Error("Failed to fetch applications for this advert.");
      }
    } catch (error) {
      throw new Error("Error while fetching applications.");
    }
  }
);

//advert id
export const fetchAdvertApplicationScores = createAsyncThunk(
  "applications/fetchAdvertApplicationScores",
  async (id) => {
    try {
      const response = await api.get(`/preshortlists/${id}`);
      if (response.status === 200) {
        if (response.data.length === 0) {
          return { data: [], message: "No Shortlists For This Advert." };
        }
        return response.data;
      } else {
        throw new Error("Failed to fetch applications for this advert.");
      }
    } catch (error) {
      throw new Error("Error while fetching applications.");
    }
  }
);

//end 


//start reqScores

export const fetchReqScores = createAsyncThunk(
  "applications/fetchReqScores",
  async () => {
    try {
      const response = await api.get("/application-scores");
      if (response.status === 200) {
        if (response.data.length === 0) {
          return { data: [], message: "No data." };
        }
        return response.data;
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      throw new Error("Error while fetching applications.");
    }
  }
);


//end reqScores


//preshortlist scores
export const fetchPreshortListScores = createAsyncThunk(
  "applications/fetchPreshortListScore",
  async (advertId) => {
    try {
      const response = await api.get(`/application-scores/${advertId}`);
      if (response.status === 200) {
        if (response.data.length === 0) {
          return { data: [], message: "No data." };
        }
        return response.data;
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      throw new Error("Error while fetching applications.");
    }
  }
);

//FETCH PROFILES
export const fetchProfiles = createAsyncThunk(
  "applications/fetchProfiles",
  async (advertId) => {
    try {
      const response = await api.get(`/profiles/${advertId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching applications.");
    }
  }
);
//FETCH APPLICANT DOCUMENTS
export const fetchApplicantDocuments = createAsyncThunk(
  "applications/fetchApplicantDocuments",
  async () => {
    try {
      const response = await api.get("/applicant-documents");
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching applications.");
    }
  }
);
export const applicantAdded = createAsyncThunk(
  "applications/applicantAdded",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/applicants", formData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        // If the server returns error messages in the response
        return rejectWithValue(error.response.data);
      } else {
        // If an unexpected error occurs
        return rejectWithValue("An error occurred while adding the applicant.");
      }
    }
  }
);
export const applicantContactAdded = createAsyncThunk(
  "applications/applicantContactAdded",
  async (formData) => {
    const response = await api.post("/applicant-contacts", formData);
    return response.data;
  }
);

export const nationalIDAdded = createAsyncThunk(
  "applications/nationalIDAdded",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/applicant-national-id", formData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        // If the server returns error messages in the response
        return rejectWithValue(error.response.data);
      } else {
        // If an unexpected error occurs
        return rejectWithValue(
          "An error occurred while adding the national ID."
        );
      }
    }
  }
);
//delete application
export const deleteApplication = createAsyncThunk(
  "applications/delete",
  async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.post(`/application/${id}`, config);
      return response.data;
    }
  }
);
export const applicantDocumentsAdded = createAsyncThunk(
  "applications/applicantDocumentsAdded",
  async (formData) => {
   // console.log(formData);
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "multipart/form-data",
        },
      };
    //  console.log(formData);
      const response = await api.post("/applicant-documents", formData, config);
      return response.data;
    }
  }
);

//applicant apply for job
// export const applicantJobApplicantion = createAsyncThunk(
//   'applicantJobApplicantion/create',
//   async ({ applicant_id, advert_id, application_status_id }, { rejectWithValue }) => {
//     try {
//       const response = await api.post('application', {
//         applicant_id: applicant_id,
//         advert_id: advert_id,
//         application_status_id: 1,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const newJobApplicantion = createAsyncThunk(
  "newJobApplicantion/create",
  async (formData) => {
    try {
      const response = await api.post("manage-application", formData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while creating the application."
      );
    }
  }
);




export const applicantJobApplicantion = createAsyncThunk(
  "applicantJobApplicantion/create",
  async ({ applicant_id, advert_id, application_status_id }) => {
    try {
      const response = await api.post("application", {
        applicant_id: applicant_id,
        advert_id: advert_id,
        application_status_id: application_status_id,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while creating the application."
      );
    }
  }
);

//applicant requirements selected
export const applicantJobRequirements = createAsyncThunk(
  "applicantJobRequirements/create",
  async (
    { requirement_id, checked, comment, application_id },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("application-requirement", {
        requirement_id: requirement_id,
        checked: checked,
        comment: comment,
        application_id: application_id,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//application documents
export const applicantDocuments = createAsyncThunk(
  "applicantDocuments/create",
  async (
    { application_id, document_type_id, comment, file },
    { rejectWithValue }
  ) => {
    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append the fields to the FormData object
      formData.append("application_id", application_id);
      formData.append("document_type_id", document_type_id);
      formData.append("comment", comment);
      formData.append("file", file);

      const response = await api.post("application-document", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the appropriate header
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//application references
export const applicantReferences = createAsyncThunk(
  "applicantReferences/create",
  async (
    {
      application_id,
      contact_type_id,
      contact,
      fullname,
      email,
      position,
      organisation,
      verified,
      comment,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("application-reference", {
        application_id: application_id,
        contact_type_id: contact_type_id,
        contact: contact,
        fullname: fullname,
        email: email,
        position: position,
        organisation: organisation,
        verified: verified,
        comment: comment,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//adding scores
export const applicationScores = createAsyncThunk(
  "applicantScores/create",
  async (
    { application_id, requirement_id, score, type, comment },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("application-scores", {
        application_id: application_id,
        requirement_id: requirement_id,
        score: score,
        type: type,
        comment: comment,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adjustpplicationScores = createAsyncThunk(
  "applicantScores/create",
  async (
    { application_id, requirement_id, score, type, comment },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("application-scores", {
        application_id: application_id,
        requirement_id: requirement_id,
        score: score,
        type: type,
        comment: comment,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//dummy
// export const updateHumanApplicationScores = createAsyncThunk(
//   "applicantHumanScores/update",
//   async (
//     formData, rejectWithValue
//     // { id, application_id, requirement_id, score, type, comment },
//     // { rejectWithValue }
//   ) => {
//     try {
//       const response = await api.put(`application-scores/${formData.id}`, formData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
//dummy
//update human score
export const updateHumanApplicationScores = createAsyncThunk(
  "applicantHumanScores/update",
  async (
    { id, application_id, requirement_id, score, type, comment },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`application-scores/${id}`, {
        application_id: application_id,
        id: id,
        score: score,
        type: type,
        requirement_id: requirement_id,
        comment: comment,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
///end update human score
//shortlisting the applicant
export const shortListApplicant = createAsyncThunk(
  "shortListApplicant/create",
  async ({ application_id, applicant_id, status_id }, { rejectWithValue }) => {
    try {
      const response = await api.post("shortlists", {
        application_id: application_id,
        applicant_id: applicant_id,
        status_id: status_id,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//ADD dOCUMENT TYPES
export const addDocumentTypes = createAsyncThunk(
  "advert/addDocumentTypes",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/document-types", formData);
      return response.data;
    } catch (err) {
      // Use `rejectWithValue` to return an error object with a message
      //return rejectWithValue(err.response.data);
      //console.log(err.response.data);
    }
  }
);

//ADD CONTACT TYPE
export const addContactType = createAsyncThunk(
  "advert/addContactType",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/contact-types", formData);
      return response.data;
    } catch (err) {
      // Use `rejectWithValue` to return an error object with a message
      //return rejectWithValue(err.response.data);
     // console.log(err.response.data);
    }
  }
);
// add nationality
export const addNationality = createAsyncThunk(
  "advert/addNationality",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/nationality", formData);
      return response.data;
    } catch (err) {
      // Use `rejectWithValue` to return an error object with a message
      //return rejectWithValue(err.response.data);
      //console.log(err.response.data);
    }
  }
);
export const ApplicantInterview = createAsyncThunk(
  "ApplicantInterview/create",
  async ({ application_id, status }, { rejectWithValue }) => {
    try {
      const response = await api.post("interviews", {
        application_id: application_id,
        status: status,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Delete Document Type
export const deleteDocumentType = createAsyncThunk(
  "applications/deleteDocumentType",
  async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await api.delete(`/document-types/${id}`, config);
      return id;
    }
  }
);
//Delete contsct
export const deleteContact = createAsyncThunk(
  "applications/deleteContact",
  async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await api.delete(`/applicant-contacts/${id}`, config);
      return id;
    }
  }
);
//Delete Contact Type
export const deleteContactType = createAsyncThunk(
  "applications/deleteContactType",
  async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await api.delete(`/contact-types/${id}`, config);
      return id;
    }
  }
);
//Delete Nationality
export const deleteNationality = createAsyncThunk(
  "applications/deleteNationality",
  async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await api.delete(`/nationality/${id}`, config);
      return id;
    }
  }
);
//update contact type
export const updateContactType = createAsyncThunk(
  "contactTypes/update",
  async (contactType) => {
    const config = {
      method: "put",
      url: `https://hrm.msu.ac.zw/api/v1/contact-types/${contactType.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(contactType),
    };

    const response = await axios(config);
    return response.data;
  }
);
export const updateDocumentType = createAsyncThunk(
  "documentTypes/update",
  async (documentType) => {
    const config = {
      method: "put",
      url: `https://hrm.msu.ac.zw/api/v1/document-types/${documentType.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(documentType),
    };

    const response = await axios(config);
    return response.data;
  }
);
export const updateNationality = createAsyncThunk(
  "nationality/update",
  async (nationality) => {
    const config = {
      method: "put",
      url: `https://hrm.msu.ac.zw/api/v1/nationality/${nationality.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(nationality),
    };

    const response = await axios(config);
    return response.data;
  }
);
//adjust the applicant's score
// export const adjustScore = createAsyncThunk(
//   'adjustScore/create',
//   async ({ application_id, requirement_id, score, type, comment }, { rejectWithValue }) => {
//     try {
//       const response = await api.post('application_scores', {
//         applicant_id: applicant_id,
//         application_id: application_id,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const fetchApplicantContacts = createAsyncThunk(
  "fetchApplicantContacts",
  async (id) => {
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
  }
);
const initialState = {
  applications: [],
  application: [],
  nationalities: [],
  scores: [],
  applicanstAdvert: [],
  contactTypes: [],
  maritalStatuses: [],
  applicant: null,
  applicantContacts: [],
  documentTypes: [],
  applicationDocuments: [],
  applicationReference: [],
  shortlistpplicant: [],
  adjustScore: [],
  applicantInterview: [],
  applicantDocuments: [],
  status: "idle",
  applicationStatus: "idle",
  error: null,
  profiles: [],
  applicantContactAddedError: null,
  applicantAddedError: null,
  nationalIDAddedError: null,
  applicantAddedStatus: "idle",
  nationalIDAddedStatus: "idle",
  preshortlistScores: [],
  applicationadvertScores: null,
  jobApplicantion: null,
  reqScores: null,
};
const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    resetApplicationsState(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data } = action.payload || {};
        state.applications = data;
        state.status = "idle";
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // fetch nationalities
      .addCase(fetchNationalities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nationalities = action.payload;
        state.status = "idle";
      })
      //fetch contact types
      .addCase(fetchContactTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contactTypes = action.payload;
        state.status = "idle";
      })
      .addCase(fetchApplicantContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.applicantContacts = action.payload;
        state.status = "idle";
      })




      //newJobApplicantion
      .addCase(newJobApplicantion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobApplicantion = action.payload;
        state.status = "idle";
      })
      //end

      //fetch merital status
      .addCase(fetchMaritalStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.maritalStatuses = action.payload;
        state.status = "idle";
      })
      //add applicant
      .addCase(applicantAdded.pending, (state) => {
        state.applicantAddedStatus = "loading";
      })
      .addCase(applicantAdded.fulfilled, (state, action) => {
        state.applicantAddedStatus = "succeeded";
        state.applicant = action.payload;
        //state.status = "idle";
      })
      .addCase(applicantAdded.rejected, (state, action) => {
        state.applicantAddedStatus = "failed";
        state.applicantAddedError = action.payload;
      })
      //FETCH APPLICANT DOCUMENTS
      .addCase(fetchApplicantDocuments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchApplicantDocuments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.applicantDocuments = action.payload.data;
        state.status = "idle";
      })
      .addCase(fetchApplicantDocuments.rejected, (state, action) => {
        state.status = "failed";
      })
      //FETCH PROFILES
      .addCase(fetchProfiles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profiles = action.payload.data;
        state.status = "idle";
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = "failed";
      })
      //national id added
      .addCase(nationalIDAdded.pending, (state) => {
        state.status = "loading";
      })
      .addCase(nationalIDAdded.fulfilled, (state, action) => {
        //state.status = "succeeded";
        state.applicant = action.payload;
        state.nationalIDAddedError = null;
        state.nationalIDAddedStatus = "succeeded";
      })
      .addCase(nationalIDAdded.rejected, (state, action) => {
        state.nationalIDAddedStatus = "failed";
        state.nationalIDAddedError = action.payload;
      })
      //applicant contact added
      .addCase(applicantContactAdded.pending, (state) => {
        state.status = "loading";
      })
      .addCase(applicantContactAdded.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.applicantContacts.push(action.payload);
        state.status = "idle";
      })
      .addCase(applicantContactAdded.rejected, (state, action) => {
        state.status = "failed";
        state.applicantContactAddedError = action.error;
      })

      //fetch document types
      .addCase(fetchDocumentTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.documentTypes = action.payload;
        state.status = "idle";
      })
      //add applicant documents
      .addCase(applicantDocumentsAdded.pending, (state) => {
        state.status = "loading";
      })
      .addCase(applicantDocumentsAdded.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.documentTypes = action.payload;
        state.status = "idle";
      })
      .addCase(applicantDocumentsAdded.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      //add scores
      .addCase(applicationScores.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.documentTypes = action.payload;
        state.status = "idle";
      })
      .addCase(applicationScores.rejected, (state, action) => {
        state.status = "fialed";
        state.documentTypes = action.payload;
        state.status = "idle";
      })
      //delete Application
      .addCase(deleteApplication.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id } = action.payload;
        state.applications = state.applications.filter((app) => app.id !== id);
        state.status = "idle";
      })
      .addCase(deleteApplication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      //fetch application scores
      .addCase(fetchApplicationScores.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.scores = action.payload;
        state.status = "idle";
      })
      .addCase(fetchApplicationScores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      //fetch ReqScores
      .addCase(fetchReqScores.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reqScores = action.payload;
        state.status = "idle";
      })
      .addCase(fetchReqScores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })


      //end 

      //adverrt application scores
      .addCase(fetchAdvertApplicationScores.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.applicationadvertScores = action.payload;
        state.status = "idle";
      })
      .addCase(fetchAdvertApplicationScores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      //end

      //fetch application refernces
      .addCase(fetchApplicationReferences.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.applicationReference = action.payload;
        state.status = "idle";
      })
      .addCase(fetchApplicationReferences.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      //applicationadverts
      .addCase(fetchApplicationsAdvert.fulfilled, (state, action) => {
        state.status = "succeded";
        state.applicanstAdvert = action.payload;
        state.status = "idle";
      })
      .addCase(fetchApplicationsAdvert.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      //shortlisting
      .addCase(shortListApplicant.fulfilled, (state, action) => {
        state.status = "succeded";
        state.shortlistpplicant = action?.payload;
        state.status = "idle";
      })
      .addCase(shortListApplicant.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      //fetch document files
      .addCase(fetchApplicationDocuments.fulfilled, (state, action) => {
        state.status = "succeded";
        state.applicationDocuments = action.payload.data;
        state.status = "idle";
      })
      .addCase(fetchApplicationDocuments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      //applicant interveiw ApplicantInterview
      .addCase(ApplicantInterview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.applicantInterview = action.payload;
        state.status = "idle";
      })
      .addCase(ApplicantInterview.rejected, (state, action) => {
        state.status = "fialed";
        state.applicantInterview = action.payload;
        state.status = "idle";
      })
      //ADD DOCUMENT TYPES
      .addCase(addDocumentTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.documentTypes.push(action.payload);
        state.status = "idle";
      })

      .addCase(addDocumentTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update DOCUMENT TYPES
      .addCase(updateDocumentType.fulfilled, (state, action) => {
        const updatedDocumentType = action.payload.data;
        state.status = "succeeded";

        // Find the index of the existing document type in the state
        const index = state.documentTypes.findIndex(
          (dt) => dt.id === updatedDocumentType.id
        );

        if (index !== -1) {
          // Replace the existing document type with the updated one
          state.documentTypes[index] = updatedDocumentType;
        } else {
          // Add the updated document type to the array if it doesn't exist
          state.documentTypes.push(updatedDocumentType);
        }

        state.status = "idle";
      })

      .addCase(updateDocumentType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //ADD CONTACT TYPE
      .addCase(addContactType.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contactTypes.push(action.payload.data);
        state.status = "idle";
      })

      .addCase(addContactType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update CONTACT TYPE
      .addCase(updateContactType.fulfilled, (state, action) => {
        const updatedContactType = action.payload.data;
        state.status = "succeeded";

        // Find the index of the existing contact type in the state
        const index = state.contactTypes.findIndex(
          (ct) => ct.id === updatedContactType.id
        );

        if (index !== -1) {
          // Replace the existing contact type with the updated one
          state.contactTypes[index] = updatedContactType;
        } else {
          // Add the updated contact type to the array if it doesn't exist
          state.contactTypes.push(updatedContactType);
        }

        state.status = "idle";
      })
      .addCase(updateContactType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //ADD NATIONALITY
      .addCase(addNationality.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nationalities.push(action.payload);
        state.status = "idle";
      })

      .addCase(addNationality.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update NATIONALITY
      .addCase(updateNationality.fulfilled, (state, action) => {
        const updatedNationality = action.payload.data;
        state.status = "succeeded";

        // Check if the updated nationality already exists in the state
        const existingNationality = state.nationalities.find(
          (n) => n.id === updatedNationality.id
        );

        if (existingNationality) {
          // Replace the existing nationality with the updated one
          Object.assign(existingNationality, updatedNationality);
        } else {
          // Add the updated nationality to the array if it doesn't exist
          state.nationalities.push(updatedNationality);
        }

        state.status = "idle";
      })

      .addCase(updateNationality.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //fetchPreshortListScores
      .addCase(fetchPreshortListScores.fulfilled, (state, action) => {
        state.status = "succeded";
        state.preshortlistScores = action.payload.data;
        state.status = "idle";
      })
      .addCase(fetchPreshortListScores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      //Delete Document type
      .addCase(deleteDocumentType.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.documentTypes = state.documentTypes.filter(
          (type) => type.id !== action.payload
        );
        state.status = "idle";
      })
      .addCase(deleteDocumentType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      //delete Contact
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.status = "idle";
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      //delete Contact type
      .addCase(deleteContactType.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contactTypes = state.contactTypes.filter(
          (type) => type.id !== action.payload
        );
        state.status = "idle";
      })
      .addCase(deleteContactType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      //delete Nationality
      .addCase(deleteNationality.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nationalities = state.nationalities.filter(
          (type) => type.id !== action.payload
        );
        state.status = "idle";
      })
      .addCase(deleteNationality.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});
export const { resetApplicationsState } = applicationsSlice.actions;
export default applicationsSlice.reducer;
