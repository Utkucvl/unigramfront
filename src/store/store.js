import { configureStore } from "@reduxjs/toolkit";
import securitySlice from "./securitySlice";
import announcementSlice from "./announcementSlice";
import activitySlice from "./activitySlice";
import myActivitySlice from "./myActivitySlice";
import clubSlice from "./clubSlice";
export const store = configureStore({
  reducer: {
    security: securitySlice,
    announcement: announcementSlice,
    activity:activitySlice,
    myActivity:myActivitySlice,
    club:clubSlice
  },
});
