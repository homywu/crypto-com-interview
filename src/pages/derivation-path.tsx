import React from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { actionCreators, IMapState, mapState } from '../stores';
import { handleNull } from '../libs/utils';

const _DerivationPathSection = ({ mnemonicInfo, derivationPathInfo }: IMapState) => {

  return (<>
    <Grid item xs={12} sm={12}>
      <Typography variant="h4" component="h1" gutterBottom style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        Derivation Path (BIP44)
            </Typography>
    </Grid>
    <Grid item xs={3}>
      <TextField
        id="purpose"
        label="Purpose"
        value={derivationPathInfo?.purpose}
        disabled
        variant="outlined"
      />
    </Grid>
    <Grid item xs={3}>
      <TextField
        id="coin"
        label="Coin"
        value={derivationPathInfo?.coin}
        disabled
        variant="outlined"
      />
    </Grid>
    <Grid item xs={3}>
      <TextField
        id="account"
        label="Account"
        value={derivationPathInfo?.account}
        variant="outlined"
      />
    </Grid>
    <Grid item xs={3}>
      <TextField
        id="change"
        label="External / Internal Change"
        value={derivationPathInfo?.change}
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12} sm={12}>
      <TextField
        id="derivationPath"
        label="Derivation Path"
        disabled
        value={handleNull(derivationPathInfo?.derivationPath)}
        fullWidth
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12} sm={12}>
      <TextField
        id="bip32PrivateKey"
        label="BIP32 Extended Private Key"
        disabled
        multiline
        rows={4}
        value={handleNull(derivationPathInfo?.bip32PrivateKey)}
        fullWidth
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12} sm={12}>
      <TextField
        id="bip32PublicKey"
        label="BIP32 Extended Public Key"
        disabled
        multiline
        rows={4}
        value={handleNull(derivationPathInfo?.bip32PublicKey)}
        fullWidth
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12} sm={12}>
      <TextField
        id="privateKey"
        label="Account Extended Private Key"
        disabled
        multiline
        rows={4}
        value={handleNull(derivationPathInfo?.accountPrivateKey)}
        fullWidth
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12} sm={12}>
      <TextField
        id="publicKey"
        label="Account Extended Public Key"
        disabled
        multiline
        rows={4}
        value={handleNull(derivationPathInfo?.accountPublicKey)}
        fullWidth
        variant="outlined"
      />
    </Grid>
  </>);
}

export const DerivationPathSection = connect(
  mapState,
  actionCreators
)(_DerivationPathSection);