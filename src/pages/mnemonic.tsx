import React, { useState } from 'react';
import { Divider, Grid, IconButton, InputBase, makeStyles, MenuItem, OutlinedInputProps, Paper, Select, TextField, Typography } from '@material-ui/core';
import { LibraryBooks } from '@material-ui/icons';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import { isNumber } from 'lodash';
import { connect, useDispatch } from 'react-redux';
import { mnemonicSlice } from '../stores/mnemonic-store';
import { errorSlice } from '../stores/error-store';
import { actionCreators, IMapState, mapState } from '../stores';
import { handleNull } from '../libs/utils';
import { derivationPathInfoSlice } from '../stores/derivation-path-store';
import { Mnemonic } from '../libs/mnemonic';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const _MnemonicSection = ({ mnemonicInfo }: IMapState) => {
  const classes = useStyles();
  const [numbOfWords, setNumberOfWords] = useState(15);
  const dispatch = useDispatch();

  const onNumbOfWordsChange: SelectInputProps['onChange'] = (e) => {
    if (isNumber(e.target.value)) {
      setNumberOfWords(e.target.value);
    }
  };

  const onWordsChange: OutlinedInputProps['onChange'] = (e) => {
    // setWords(e.target.value);
  };

  const calcDerivationPath: OutlinedInputProps['onChange'] = (e) => {
    if (!!e.target.value) {
      dispatch(
        derivationPathInfoSlice.actions.calcDerivationPath(
          e.target.value),
      );
    }
  };

  const calcMnemonic = (numbOfWords: number) => {
    if (!window.crypto) {
      throw new Error('The current browser does not support strong randomness.');
    }
    const randomValues = Mnemonic.getRandomValues(
      numbOfWords, window.crypto.getRandomValues,
    );
    const entropy = Mnemonic.toEntropy(randomValues);
    const words = Mnemonic.toMnemonic(randomValues);
    const bufSeed = Mnemonic.toSeed(words);
    const bip32RootKey = Mnemonic.toBip32RootKey(bufSeed);
    return {
      numbOfWords,
      entropy,
      words,
      seed: bufSeed.toString('hex'),
      rootKey: bip32RootKey.toBase58(),
    };
  }

  const onGenerateClicked = () => {
    try {
      if (!window.crypto) {
        throw new Error('The current browser does not support strong randomness.');
      }

      const result = calcMnemonic(numbOfWords);
      dispatch(mnemonicSlice.actions.setMnemonic(result));
      dispatch(
        derivationPathInfoSlice.actions.calcDerivationPath(result.rootKey),
      );
    } catch (error) {
      dispatch(errorSlice.actions.setError(error));
    }
  };

  return (<>
    <Grid item xs={12} sm={12}>
      <Typography variant='h4' component='h1' gutterBottom style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        Mnemonic
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Paper component='form' className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder='Entropy'
          inputProps={{ 'aria-label': 'entropy' }}
          value={handleNull(mnemonicInfo?.entropy)}
        />
        <Select
          labelId='numbOfWords'
          id='numbOfWords'
          value={mnemonicInfo?.numbOfWords}
          onChange={onNumbOfWordsChange}
        >
          <MenuItem value={3}>3 words</MenuItem>
          <MenuItem value={6}>6 words</MenuItem>
          <MenuItem value={9}>9 words</MenuItem>
          <MenuItem value={12}>12 words</MenuItem>
          <MenuItem value={15}>15 words</MenuItem>
          <MenuItem value={18}>18 words</MenuItem>
          <MenuItem value={21}>21 words</MenuItem>
          <MenuItem value={24}>24 words</MenuItem>
        </Select>
        <Divider className={classes.divider} orientation='vertical' />
        <IconButton className={classes.iconButton} aria-label='search' onClick={onGenerateClicked}>
          <LibraryBooks />
        </IconButton>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={12}>
      <TextField
        id='phrase'
        label='BIP39 Mnemonic (Phrase)'
        multiline
        rows={4}
        value={handleNull(mnemonicInfo?.words)}
        onChange={onWordsChange}
        fullWidth
        variant='outlined'
      />
    </Grid>
    <Grid item xs={12} sm={12}>
      <TextField
        id='seed'
        label='BIP39 Seed'
        multiline
        rows={4}
        value={handleNull(mnemonicInfo?.seed)}
        fullWidth
        variant='outlined'
      />
    </Grid>
    <Grid item xs={12} sm={12}>
      <TextField
        id='bip32rootkey'
        label='BIP32 Root Key'
        multiline
        rows={4}
        value={handleNull(mnemonicInfo?.rootKey)}
        onChange={calcDerivationPath}
        fullWidth
        variant='outlined'
      />
    </Grid>
  </>);
}

export const MnemonicSection = connect(
  mapState,
  actionCreators
)(_MnemonicSection);