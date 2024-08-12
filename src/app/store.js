import { configureStore } from "@reduxjs/toolkit";
import advertsReducer from "../features/adverts/advertsSlice";
import usersReducer from "../features/users/usersSlice";
import requirementsReducer from "../features/requirements/requirementsSlice";
import applicationsReducer from "../features/applications/applicationsSlice";
import interviewReducer
 from "../features/interviews/interviewSlice";
 import { advertsApi } from '../apis/advertsApi';
import { setupListeners } from '@reduxjs/toolkit/query/react';



export const store = configureStore({
  reducer: {
    adverts: advertsReducer,
    users: usersReducer,
    requirements: requirementsReducer,
    applications: applicationsReducer,
    interview: interviewReducer,
    [advertsApi.reducerPath]: advertsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(advertsApi.middleware)
});

setupListeners(store.dispatch);
