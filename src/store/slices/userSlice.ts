import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  authenticated: null | boolean;
  address: string | undefined;
  token: null | number;
  tokenName: string | undefined;
}

const initialState: IUserState = {
  authenticated: null,
  address: undefined,
  token: null,
  tokenName: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAddress: (user, action: PayloadAction<string>) => {
      user.address = action.payload;
    },
    setAuthenticated: (user, action: PayloadAction<boolean>) => {
      user.authenticated = action.payload;
    },
    setTokenId: (user, action: PayloadAction<number | null>) => {
      user.token = action.payload;
    },
    setTokenName: (user, action: PayloadAction<string | undefined>) => {
      user.tokenName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserAddress, setAuthenticated, setTokenId, setTokenName } = userSlice.actions;

export const userReducer = userSlice.reducer;
