import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../components/api/api";


const initialState = {
  myActivities: [],
  loading: true,
  err: {},
};
export const getMyActivities = createAsyncThunk(
  "/activity/getMyActivities",
  async (data, thunkApi) => {
    console.log(data.userId)
    try {
      const response = await axios.get("/activity/filter/"+data.userId);
      console.log(response.data)
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const joinActivity = createAsyncThunk(
  "/activity/joinActivity",
 
  async (data, thunkApi) => {
    try { 
      console.log(data)
      const response = await axios.post("/activity/add", data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const quitActivity = createAsyncThunk(
    "/activity/quitActivity",
   
    async (data, thunkApi) => {
      try { 
        console.log(data)
        const response = await axios.post("/activity/remove", data);
        return response.data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data);
      }
    }
  );




export const myActivitySlice = createSlice({
  name: "myActivity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyActivities.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getMyActivities.fulfilled, (state, action) => {
      state.myActivities = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getMyActivities.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });

    

    builder.addCase(joinActivity.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(joinActivity.fulfilled, (state, action) => {
      state.myActivities = [...state.myActivities, action.payload];
      state.loading = false;
      state.err = "";
    });

    builder.addCase(joinActivity.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on saving Data.";
    });


    builder.addCase(quitActivity.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(quitActivity.fulfilled, (state, action) => {
      state.myActivities = state.myActivities.filter((item) => (item.id !== action.payload.id))
      state.loading = false;
      state.err = "";
    });

    builder.addCase(quitActivity.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on Deleting Data.";
    });
  },
});

export default myActivitySlice.reducer;
