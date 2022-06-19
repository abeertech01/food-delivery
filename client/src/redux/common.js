import { createSlice } from "@reduxjs/toolkit";

const stateData = {
  isAuthModal: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState: stateData,
  reducers: {
    toggleAuthModal(state) {
      state.isAuthModal = !state.isAuthModal;
    },
  },
});

export const { toggleAuthModal } = commonSlice.actions;

export default commonSlice.reducer;
