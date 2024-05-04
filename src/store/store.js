import { configureStore } from "@reduxjs/toolkit";
import securitySlice from "./securitySlice";
import announcementSlice from "./announcementSlice";
import activitySlice from "./activitySlice";
import myActivitySlice from "./myActivitySlice";
import clubSlice from "./clubSlice";
import userSlice from "./userSlice";
import imageSlice from "./imageSlice"

export const store = configureStore({
  reducer: {
    security: securitySlice,
    announcement: announcementSlice,
    activity:activitySlice,
    myActivity:myActivitySlice,
    club:clubSlice,
    user:userSlice,
    image:imageSlice

  },
});
