import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../components/api/api";

const initialState = {
  images: [],
  image: {},
  currentImage: {},
  loading: true,
  err: {},
};

export const getImageById = createAsyncThunk(
  "/image/getImageById",
  async (data, thunkApi) => {
    try {
      const response = await axios.get("/baseimage/" + data.id);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const saveImage = createAsyncThunk(
  "/image/saveImage",
  async (data, thunkApi) => {
    try {
      console.log(data)
      const response = await axios.post("/baseimage", data);
      return response.data;
    } catch (error) {
      console.error("Failed to save activity:", error.response?.data);
      throw error;
    }
  }
);
export const saveImageAnnouncement = createAsyncThunk(
  "/image/saveImageAnnouncement",
  async (data, thunkApi) => {
    try {
      
      const response = await axios.post("/baseimage/announcement/"+data.announcementId,data);
      return response.data;
    } catch (error) {
      console.error("Failed to save activity:", error.response?.data);
      throw error;
    }
  }
);
export const saveImageActivity = createAsyncThunk(
  "/image/saveImageActivity",
  async (data, thunkApi) => {
    try {
      console.log(data)
      const response = await axios.post("/baseimage/activity/"+data.activityId,data);
      return response.data;
    } catch (error) {
      console.error("Failed to save activity:", error.response?.data);
      throw error;
    }
  }
);
export const saveImageClub = createAsyncThunk(
  "/image/saveImageClub",
  async (data, thunkApi) => {
    try {
      console.log(data)
      const response = await axios.post("/baseimage/club/"+data.clubI,data);
      return response.data;
    } catch (error) {
      console.error("Failed to save activity:", error.response?.data);
      throw error;
    }
  }
);

export const deleteImage = createAsyncThunk(
  "image/deleteImage",
  async ({ id }, thunkApi) => {
    try {
      const response = await axios.delete(`/baseimage/${id}`);
      return { id };
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveImage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(saveImage.fulfilled, (state, action) => {
      state.images = [...state.images, action.payload];
      state.loading = false;
      state.currentImage = action.payload;
      state.image = action.payload;
      state.err = "";
    });

    builder.addCase(saveImage.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on saving Data.";
    });
    builder.addCase(saveImageAnnouncement.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(saveImageAnnouncement.fulfilled, (state, action) => {
      state.images = [...state.images, action.payload];
      state.loading = false;
      state.currentImage = action.payload;
      state.image = action.payload;
      state.err = "";
    });

    builder.addCase(saveImageAnnouncement.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on saving Data.";
    });
    builder.addCase(saveImageActivity.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(saveImageActivity.fulfilled, (state, action) => {
      state.images = [...state.images, action.payload];
      state.loading = false;
      state.currentImage = action.payload;
      state.image = action.payload;
      state.err = "";
    });

    builder.addCase(saveImageActivity.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on saving Data.";
    });
    builder.addCase(saveImageClub.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(saveImageClub.fulfilled, (state, action) => {
      state.images = [...state.images, action.payload];
      state.loading = false;
      state.currentImage = action.payload;
      state.image = action.payload;
      state.err = "";
    });

    builder.addCase(saveImageClub.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on saving Data.";
    });

    builder.addCase(deleteImage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteImage.fulfilled, (state, action) => {
      state.images = state.images.filter(
        (item) => item.id !== action.payload.id
      );
      state.loading = false;
      if (state.currentImage.id === action.payload.id) {
        state.currentImage = {};
      }
      if (state.image.id === action.payload.id) {
        state.image = {};
      }
      state.err = "";
    });

    builder.addCase(deleteImage.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on Deleting Data.";
    });
    builder.addCase(getImageById.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getImageById.fulfilled, (state, action) => {
      state.image = action.payload;
      state.loading = false;
    });

    builder.addCase(getImageById.rejected, (state, action) => {
      state.loading = false;
      state.err = { message: "Problem on getting Data." };
    });
  },
});

export default imageSlice.reducer;
