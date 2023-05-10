import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const addUser = createAsyncThunk ("user/add",async(user)=>{
  const res = await axios.post ("https://jsonplaceholder.typicode.com/users",user)
  return res.data
} )

export const userSlice = createSlice({
  name : 'user',
  initialState: {
    userData: {
      name :""
    },
    loading :false,
    error : false
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
      state.loading = false;
      state.userData= action.payload;
    }
  }
})
export default userSlice.reducer