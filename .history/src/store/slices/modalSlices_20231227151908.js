// modalSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: false,
  modalData: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.showModal = true;
      state.modalData = action.payload;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.modalData = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModal = (state) => state.modal;

export default modalSlice.reducer;
