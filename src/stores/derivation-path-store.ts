import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import { Mnemonic } from '../libs/mnemonic';

export interface IDerivationPathInfo {
  purpose?: number;
  coin?: number;
  account?: number;
  change?: number;
  derivationPath?: string;
  bip32PrivateKey?: string;
  bip32PublicKey?: string;
  accountPrivateKey?: string;
  accountPublicKey?: string;
}

export const derivationPathInfoSlice = createSlice({
  name: 'derivationPathInfos',
  initialState: {
    purpose: 44,
    coin: 0,
    account: 0,
    change: 0,
  } as IDerivationPathInfo,
  reducers: {
    calcDerivationPath: (state, action: PayloadAction<string>) => {
      const strBip32RootKey = action.payload;
      if (isEmpty(strBip32RootKey)) {
        return state;
      }
      const bip32RootKey = Mnemonic.stringToBip32RootKey(strBip32RootKey);
      const bip32DerivationPath = Mnemonic.getDerivationPath(
        state.purpose,
        state.coin,
        state.account,
        state.change,
      );
      const bip44DerivationPath = Mnemonic.getBip44DerivationPath(
        state.purpose,
        state.coin,
        state.account,
      );

      const bip32ExtendedKey = Mnemonic.getExtendedKey(bip32DerivationPath, bip32RootKey);

      const bip44ExtendedKey = Mnemonic.getExtendedKey(bip44DerivationPath, bip32RootKey);

      return {
        purpose: state.purpose,
        coin: state.coin,
        account: state.account,
        change: state.change,
        derivationPath: bip32DerivationPath,
        bip32PrivateKey: bip32ExtendedKey?.toBase58() || '',
        bip32PublicKey: bip32ExtendedKey?.neutered().toBase58() || '',
        accountPrivateKey: bip44ExtendedKey?.toBase58() || '',
        accountPublicKey: bip44ExtendedKey?.neutered().toBase58() || '',
      };
    }
  },
});
