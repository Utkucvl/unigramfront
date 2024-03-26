import { configureStore } from "@reduxjs/toolkit";
import securitySlice from "./securitySlice";
import announcementSlice from "./announcementSlice";
import activitySlice from "./activitySlice";
export const store = configureStore({
  reducer: {
    security: securitySlice,
    announcement: announcementSlice,
    activity:activitySlice
  },
});
