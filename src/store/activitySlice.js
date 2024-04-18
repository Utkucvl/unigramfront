import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../components/api/api";


const initialState = {
  activities: [],
  activity: {},
  currentActivity: {},
  loading: true,
  err: {},
};
export const changeActivity = createAsyncThunk(
  "/activity/changeActivity",
  async (data, thunkApi) => {
    try {
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(data);
    }
  }
);
export const getActivities = createAsyncThunk(
  "/activity/getActivities",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/activity");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const getPastActivities = createAsyncThunk(
  "/activity/getPastActivities",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/activity/past");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const getActivity = createAsyncThunk(
    "/activity/getActivity",
    async (data, thunkApi) => {
      try {
        const response = await axios.get("/activity/"+data.id);
        return response.data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data);
      }
    }
  );
  export const saveActivity = createAsyncThunk(
    "/activity/saveActivity",
    async (data, thunkApi) => {
      try {
        const response = await axios.post("/activity", data);
        return response.data;
      } catch (error) {
        console.error('Failed to save activity:', error.response?.data);
        throw error; 
      }
    }
  );
  
  
export const updateActivity = createAsyncThunk(
  "/activity/updateActivity",
  async (data, thunkApi) => {
    try {
      const response = await axios.put(`/activity/${data.id}`, data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteActivity = createAsyncThunk(
  "activity/deleteActivity",
  async ({ id }, thunkApi) => {
    try {
      const response = await axios.delete(`/activity/${id}`);
      return { id };
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeActivity.fulfilled, (state, action) => {
      state.currentActivity = action.payload;
    });

    builder.addCase(getActivities.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getActivities.fulfilled, (state, action) => {
      state.activities = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getActivities.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });

    builder.addCase(getPastActivities.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getPastActivities.fulfilled, (state, action) => {
      state.activities = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getPastActivities.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });

    builder.addCase(saveActivity.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(saveActivity.fulfilled, (state, action) => {
      state.activities = [...state.activities, action.payload];
      state.loading = false;
      state.currentActivity = action.payload;
      state.activity = action.payload;
      state.err = "";
    });

    builder.addCase(saveActivity.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on saving Data.";
    });
    builder.addCase(updateActivity.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateActivity.fulfilled, (state, action) => {
      const payloadData = action.payload;
      state.activities = [...state.activities,
        state.activities.map((item) => (item.id === payloadData.id ? payloadData : item)),
      ];
      state.loading = false;
      state.currentActivity = payloadData;
      state.activity = payloadData;
      state.err = "";
    });

    builder.addCase(updateActivity.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on updating Data.";
    });

    builder.addCase(deleteActivity.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteActivity.fulfilled, (state, action) => {
      state.activities = state.activities.filter((item) => (item.id !== action.payload.id))
      state.loading = false;
      if(state.currentActivity.id === action.payload.id){
        state.currentActivity = {};
      }
      if(state.activity.id === action.payload.id){
        state.activity = {};
      }
      state.err = "";
    });

    builder.addCase(deleteActivity.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on Deleting Data.";
    });
  },
});

export default activitySlice.reducer;
