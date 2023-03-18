import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';

import { appReducer } from './slices/appSlice';
import { userReducer } from './slices/userSlice';

const combinedReducer = combineReducers({
  user: userReducer,
  app: appReducer,
});

const reducer = (state: ReturnType<any>, action: AnyAction) => {
  return combinedReducer(state, action);
};

export const store = () =>
  configureStore({
    reducer,
  });

export type RootState = ReturnType<typeof combinedReducer>;
