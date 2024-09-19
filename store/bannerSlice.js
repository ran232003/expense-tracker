import { createSlice } from "@reduxjs/toolkit";
const BannerSlice = createSlice({
  name: "banner",
  initialState: {
    visible: false, // Whether the banner is visible
    status: "success", // Can be "success" or "error"
    message: "", // Optional: a message for the banner
  },
  reducers: {
    showBanner: (state, action) => {
      state.visible = true;
      state.status = action.payload.status || "success"; // Default to success
      state.message = action.payload.message || ""; // Optional message
    },
    hideBanner: (state) => {
      state.visible = false;
    },
  },
});

export default BannerSlice;

export const bannerAction = BannerSlice.actions;
