import {
  Action, combineReducers,
  configureStore, ThunkAction,
} from '@reduxjs/toolkit';
import { derivationPathInfoSlice, IDerivationPathInfo } from './derivation-path-store';
import { errorSlice, IError } from './error-store';
import { IMnemonic, mnemonicSlice } from './mnemonic-store';

const rootReducer = combineReducers({
  mnemonicInfo: mnemonicSlice.reducer,
  error: errorSlice.reducer,
  derivationPathInfo: derivationPathInfoSlice.reducer,
});

export const actionCreators = {
  setMnemonic: mnemonicSlice.actions.setMnemonic,
  setError: errorSlice.actions.setError,
  calcDerivationPath: derivationPathInfoSlice.actions.calcDerivationPath,
};

export interface IMapState {
  mnemonicInfo?: IMnemonic,
  error?: IError,
  derivationPathInfo?: IDerivationPathInfo,
}

export const mapState = (state: IMapState) => state;

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

