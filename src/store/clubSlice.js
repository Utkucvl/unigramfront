import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../components/api/api";
import { changeActivity } from "./activitySlice";


const initialState = {
  clubs: [],
  club: {},
  currentClub: {},
  loading: true,
  err: {},
};
export const changeClub = createAsyncThunk(
  "/club/changeClub",
  async (data, thunkApi) => {
    try {
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(data);
    }
  }
);
export const getClubs = createAsyncThunk(
  "/club/getClubs",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/club");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);


export const clubSlice = createSlice({
  name: "club",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeClub.fulfilled, (state, action) => {
      state.changeClub= action.payload;
    });

    builder.addCase(getClubs.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getClubs.fulfilled, (state, action) => {
      state.clubs = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getClubs.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });
    

  },
});

export default clubSlice.reducer;
