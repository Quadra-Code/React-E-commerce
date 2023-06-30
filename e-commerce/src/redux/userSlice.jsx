import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// export const addUser = createAsyncThunk ("user/add",async(user)=>{
//   const res = await axios.post ("http://127.0.0.1:8000/add-show-categories-api",user)
//   return res.data
// } )
export const addUser = createAsyncThunk ("user/add",async(user)=>{
  const res = await axios.post ("http://localhost:9000/sections",user)
  return res.data
} )

export const userSlice = createSlice({
  name : 'user',
  initialState: {
    userData: {
      name :""
    },
    loading :false,
    error : false,
    isUpdating: false
  },
  reducers: {},
  extraReducers: {
    [addUser.pending]: (state) => {
      state.loading = true ;
    },
    [addUser.rejected]: (state) => {
      state.loading = false;
      state.error = true
    },
    [addUser.fulfilled]: (state, action) => {
      if (!state.isUpdating) {
        state.loading = false;
        state.userData = action.payload;
        state.isUpdating = true;
        console.log(action.payload);
      }
    }
  }
})
export default userSlice.reducer