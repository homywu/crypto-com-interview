/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IMnemonic {
  entropy?: string;
  numbOfWords?: number;
  words?: string;
  seed?: string;
  rootKey?: string;
}

export const mnemonicSlice = createSlice({
  name: 'mnemonicInfos',
  initialState: {
    numbOfWords: 15
  } as IMnemonic,
  reducers: {
    setMnemonic: (state, action: PayloadAction<IMnemonic>) => {
      return action.payload;
    }
  },
});
