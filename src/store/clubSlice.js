import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../components/api/api";

const initialState = {
  clubs: [],
  loading: true,
  err: null,
};

export const deleteClub = createAsyncThunk(
  "club/deleteClub",
  async (clubId, thunkApi) => {
    try {
      await axios.delete(`/club/${clubId}`);
      return clubId;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const getClubs = createAsyncThunk(
  "club/getClubs",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/club");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const createClub = createAsyncThunk(
  "club/createClub",
  async (clubData, thunkApi) => {
    try {
      const response = await axios.post("/club", clubData);
      console.log(response.data); 
      return response.data;
    } catch (error) {
      console.log(error.response.data); 
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const updateClub = createAsyncThunk(
  "club/updateClub",
  async ({ id, ...clubData }, thunkApi) => {
    try {
      console.log(`Sending PUT request to /club/${id} with data:`, clubData);
      const response = await axios.put(`/club/${id}`, clubData);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Failed to update club:", error.message);
      return thunkApi.rejectWithValue(error.response?.data || 'Update failed');
    }
  }
);

export const clubSlice = createSlice({
  name: "club",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClubs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClubs.fulfilled, (state, action) => {
        state.clubs = action.payload;
        state.loading = false;
        state.err = null;
      })
      .addCase(getClubs.rejected, (state, action) => {
        state.loading = false;
        state.err = "Problem getting data.";
      })
      .addCase(deleteClub.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteClub.fulfilled, (state, action) => {
        const deletedClubId = action.payload;
        state.clubs = state.clubs.filter((club) => club.id !== deletedClubId);
        state.loading = false;
        state.err = null;
      })
      .addCase(deleteClub.rejected, (state, action) => {
        state.loading = false;
        state.err = "Failed to delete club.";
      })
      .addCase(createClub.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClub.fulfilled, (state, action) => {
        state.clubs.push(action.payload);
        state.loading = false;
        state.err = null;
      })
      .addCase(createClub.rejected, (state, action) => {
        state.loading = false;
        state.err = "Failed to create club.";
      })
      
      
  },
});

export default clubSlice.reducer;
