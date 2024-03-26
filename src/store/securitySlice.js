import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../components/api/api";



const initialState = {
  isAuthenticated: false,
  isRegistered:false,
  accessToken: "",
  userId: 0,
  err:""
  };


export const login = createAsyncThunk(
  "auth/login",
  async (loginCred, thunkApi) => {
    try{
      const response = await axios.post(`/auth/login`,loginCred);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('userId', JSON.stringify(response.data.userId));

      return response.data;
    }
    catch(error){
      return thunkApi.rejectWithValue(error.response?.data)
    }

  }
)

export const register = createAsyncThunk(
  "auth/register",
  async (registerCred, thunkApi) => {
    try{
      const response = await axios.post(`/auth/register`,registerCred);
      return response.data;
    }
    catch(error){
      console.log(error)
      return thunkApi.rejectWithValue(error.response?.data)
    }

  }
)
  
export const securitySlice =  createSlice({
    name:"security",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
      builder.addCase(login.pending, (state) => {
        state.loading = true;
      });
        builder.addCase(login.fulfilled, (state, action) => {
          state.isAuthenticated = true;
          state.userId = action.payload.userId;
          state.accessToken = action.payload.accessToken;
          state.err="";
        })
        builder.addCase(login.rejected, (state, action) => {
          state.isAuthenticated = false;
          state.username = "";
          state.accessToken = "";
          state.err="Invalid Credentials"
        })
        builder.addCase(register.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.isRegistered = true;
          state.err="";

        })
        builder.addCase(register.rejected, (state, action) => {
          state.loading = false;
          state.err="Username or Email existed."

        })
    }
})


export default securitySlice.reducer;
