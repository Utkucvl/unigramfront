import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../components/api/api";

const initialState = {
  users: [],
  user: {},
  currentUser: {},
  loading: true,
  err: {},
};

export const getUsers = createAsyncThunk(
  "/user/getUsers",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/user");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });
  },
});

export default userSlice.reducer;
