/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IError {
  message?: string;
  stack?: string;
}

export const errorSlice = createSlice({
  name: 'errorInfos',
  initialState: {} as IError,
  reducers: {
    setError: (state, action: PayloadAction<IError>): IError => {
      const error = action.payload;
      return {
        message: error.message,
        stack: error.stack,
      };
    }
  },
});
