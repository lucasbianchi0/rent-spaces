import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  description: '',
  phone: '',
  emailSpace: '',
  images: [],
};

const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {
    updateSpace: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearSpace: () => {
      return initialState;
    },
  },
});

export const { updateSpace, clearSpace } = spaceSlice.actions;
export const selectSpace = (state) => state.space;
export default spaceSlice.reducer;
