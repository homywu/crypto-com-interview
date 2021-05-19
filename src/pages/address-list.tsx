import * as React from 'react';
import { Mnemonic } from '../libs/mnemonic';
import { BIP32Interface } from 'bip32';
import { DataGrid, GridColDef } from '@material-ui/data-grid';

// Infinity scroll is supported in XGrid enterprise version,
// So I set maximum 500 rows for now.
const MAX_ROW_LENGTH = 500;

export interface IDerivedAddress {
  id: number;
  path: string;
  address?: string;
  publicKey?: string;
  privateKey?: string;
}

const calcDerivedAddress = (index: number, length: number, bip32DerivationPath: string, bip32RootKey?: BIP32Interface) => {
  const addresses: IDerivedAddress[] = [];
  for (let i = index; i < length + index; i++) {
    if (!bip32RootKey) {
      return [];
    }
    const { payment, extendedKey } = Mnemonic.getPaymentAddress(i, bip32DerivationPath, bip32RootKey);
    const path = bip32DerivationPath + `/${i}`;
    const addressObject: IDerivedAddress = {
      path,
      id: i,
      address: payment.address,
      privateKey: extendedKey?.toWIF(),
      publicKey: extendedKey?.publicKey?.toString('hex'),
    };

    addresses.push(addressObject);
  }
  return addresses;
};

export const AddressList = (props: { bip32DerivationPath: string, bip32RootKey?: BIP32Interface }) => {
  const columns: GridColDef[] = [{
    field: 'id',
    headerName: 'id',
    hide: true,
  }, {
    field: 'path',
    headerName: 'Path',
    width: 130,
  }, {
    field: 'address',
    headerName: 'Address',
    width: 390,
  }, {
    field: 'publicKey',
    headerName: 'Public Key',
    width: 600,
  }, {
    field: 'privateKey',
    headerName: 'Private Key',
    width: 600,
  }];

  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        pagination
        columns={columns}
        rows={calcDerivedAddress(0, MAX_ROW_LENGTH, props.bip32DerivationPath, props.bip32RootKey)}
        pageSize={20}
      />
    </div>
  );
}