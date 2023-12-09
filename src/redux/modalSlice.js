import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modal: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  
  reducers: {
  
      modalFunc: (state, action) => {
      state.modal = !state.modal
      // Eğer action.payload varsa, modalContent'i güncelle
      if (action.payload) {
        state.modalContent = action.payload;
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { modalFunc } = modalSlice.actions

export default modalSlice.reducer