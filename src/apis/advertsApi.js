import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = 'https://hrm.msu.ac.zw/api/v1/advert'
// const baseUrl = 'http://127.0.0.1:8000/api/adverts'




// Define the fake API
export const advertsApi = createApi({
    reducerPath: 'advertsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
      getAdverts: builder.query({
        query: ()=>'',
      }),
      getSingleAdvert: builder.query({
        query: (advertId) => `/${advertId}`,
      }),
    }),
  });


export const { useGetAdvertsQuery, useGetSingleAdvertQuery } = advertsApi;