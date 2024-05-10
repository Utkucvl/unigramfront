import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../components/api/api";

const initialState = {
  myClubs: [] ,
  myClub: {},
  currentMyClub: {},
  loading: true,
  err: {},
};

export const getMyClubs = createAsyncThunk(

  "/club/getMyClubs",
  async ({ userId }, thunkApi) => {
    try {
      console.log("Fetching clubs for userId:", userId);
      const response = await axios.get(`/club/filter/${userId}`);
      console.log("getMyClubs response:", response.data);
      return response.data;
    } catch (error) {
      console.error("getMyClubs error:", error.response || error.message);
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const joinClub = createAsyncThunk(
  "/club/join",
  async ({ userId, clubId }, thunkApi) => {
    const response = await axios.post("/club/add", { userId, clubId });
    return response.data;
  }
);

export const leaveClub = createAsyncThunk(
  "/club/leave",
  async ({ userId, clubId }, thunkApi) => {
    const response = await axios.post("/club/remove", { userId, clubId });
    return response.data;
  }
);

export const myClubSlice = createSlice({
  name: "myClub",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyClubs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMyClubs.fulfilled, (state, action) => {
      console.log(action.payload );
      state.myClubs = action.payload;
      console.log(state.myClubs);
      state.loading = false;
      state.err = "";
    });
    builder.addCase(getMyClubs.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem fetching clubs.";
    });
    builder.addCase(joinClub.fulfilled, (state, action) => {
      state.myClubs.push(action.payload);
    });
    builder.addCase(leaveClub.fulfilled, (state, action) => {
      state.myClubs = state.myClubs.filter(club => club.id !== action.payload.id);
    });
  }
});

export default myClubSlice.reducer;
