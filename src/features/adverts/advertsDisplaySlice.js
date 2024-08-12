import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAdverts = async () => {
    const result = await fetch('https://hrm.msu.ac.zw/api/v1/advert')
    return result.json()
}

const initialStateValue = ''


const advertsDisplaySlice = createSlice({
  name: "advertsDisplay",
  initialState: { value: initialStateValue },
  reducers: {
    advertListing: (state, action)=> {
        state.value = action.payload
    }
  }  
});
export const { advertsDisplay } = advertsDisplaySlice.actions;
export default advertsDisplaySlice.reducer;
