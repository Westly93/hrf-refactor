import {createSlice} from '@reduxjs/toolkit';
const initialState= {
    isAuthenticated: false,
    isLoading: true,
    user: null,
}

const authSlice= createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: state=>{
            state.isAuthenticated= true
        },
        setUser: (state, action)=>{
            state.user= action.payload
        },
        logout:state=>{
            state.isAuthenticated= false
            state.user= null
        },
        finishInitialLoad: state=>{
            state.isLoading= false
        }
    }
})

export const { setAuth, logout, finishInitialLoad, setUser} = authSlice.actions
export default authSlice.reducer;