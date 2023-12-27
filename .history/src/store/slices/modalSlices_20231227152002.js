// modalSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modals: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { modalId, modalData } = action.payload;
      state.modals[modalId] = { showModal: true, modalData };
    },
    closeModal: (state, action) => {
      const { modalId } = action.payload;
      state.modals[modalId] = { showModal: false, modalData: null };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalById = (modalId) => (state) =>
  state.modal.modals[modalId];

export default modalSlice.reducer;
