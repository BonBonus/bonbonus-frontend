import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  tokenCongratsModalOpened: boolean;
}

const initialState: IUserState = {
  tokenCongratsModalOpened: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTokenCongratsModalOpened: (value, action: PayloadAction<boolean>) => {
      value.tokenCongratsModalOpened = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTokenCongratsModalOpened } =
  appSlice.actions;

export const appReducer = appSlice.reducer;
