import React, { useState } from 'react';
import {
  Box, Container, Typography, Avatar,
  Grid, Paper, IconButton,
  InputBase, Divider, makeStyles, Select,
  MenuItem, Collapse, TextField, OutlinedInputProps
} from '@material-ui/core';
import * as _ from 'lodash';
import { Close, LibraryBooks } from '@material-ui/icons';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Mnemonic } from './libs/mnemonic';
import { BIP32Interface } from 'bip32';
import { AddressList } from './pages/address-list';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 800,
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

const generate = (numbOfWords: number) => {
  const strength = numbOfWords / 3 * 32;
  const buffer = new Uint8Array(strength / 8);

  const randomValues = crypto.getRandomValues(buffer);

  const words = Mnemonic.toMnemonic(randomValues);
  const entropy = Mnemonic.toEntropy(randomValues);

  return { words, entropy };
};

export default function App() {
  const classes = useStyles();

  const [numbOfWords, setNumberOfWords] = useState(15);
  const [alertContent, setAlertContent] = useState('');
  const [entropy, setEntropy] = useState('');
  const [words, setWords] = useState('');
  const [seed, setSeed] = useState('');
  const [rootKey, setRootKey] = useState<BIP32Interface>();
  // only support bip44 for interview
  const [purpose, setPurpose] = useState(44);
  // only support bitcoin for interview
  const [coin, setCoin] = useState(0);
  const [account, setAccount] = useState(0);
  const [change, setChange] = useState(0);
  const [derivationPath, setDerivationPath] = useState('');
  const [bip32PrivateKey, setBip32PrivateKey] = useState('');
  const [bip32PublicKey, setBip32PublicKey] = useState('');
  const [accountPrivateKey, setAccountPrivateKey] = useState('');
  const [accountPublicKey, setAccountPublicKey] = useState('');

  const onNumbOfWordsChange: SelectInputProps['onChange'] = (e) => {
    if (_.isNumber(e.target.value)) {
      setNumberOfWords(e.target.value);
    }
  };

  const onWordsChange: OutlinedInputProps['onChange'] = (e) => {
    setWords(e.target.value);
  };

  const onGenerateClicked = () => {
    try {
      if (!window.crypto) {
        throw new Error('The current browser does not support strong randomness.');
      }
      const generatedInfo = generate(numbOfWords);
      setWords(generatedInfo.words);
      setEntropy(generatedInfo.entropy);
      Mnemonic.validatePhrase(generatedInfo.words);
      const bufSeed = Mnemonic.toSeed(generatedInfo.words);
      setSeed(bufSeed.toString('hex'));
      const bip32RootKey = Mnemonic.toBip32RootKey(bufSeed);
      setRootKey(bip32RootKey);
      calcDerivationPath(bip32RootKey);
    } catch (error) {
      setAlertContent(error.message);
    }
  };

  const calcDerivationPath = (bip32RootKey: BIP32Interface) => {
    try {
      const bip32DerivationPath = Mnemonic.getDerivationPath(purpose, coin, account, change);
      setDerivationPath(bip32DerivationPath);

      Mnemonic.validateDerivationPath(bip32DerivationPath, bip32RootKey);
      calcBip32Keys(bip32DerivationPath, bip32RootKey);

      const accountDerivationPath = Mnemonic.getBip44DerivationPath(purpose, coin, account);
      calcAccountKeys(accountDerivationPath, bip32RootKey);

    } catch (error) {
      setAlertContent(error.message);
    }
  };

  const calcBip32Keys = (derivationPath: string, bip32RootKey: BIP32Interface) => {
    const bip32ExtendedKey = Mnemonic.getBip32ExtendedKey(derivationPath, bip32RootKey);
    setBip32PrivateKey(bip32ExtendedKey?.toBase58() || '');
    setBip32PublicKey(bip32ExtendedKey?.neutered().toBase58() || '');
  };

  const calcAccountKeys = (derivationPath: string, bip32RootKey: BIP32Interface) => {
    const bip44ExtendedKey = Mnemonic.getBip32ExtendedKey(derivationPath, bip32RootKey);
    setAccountPrivateKey(bip44ExtendedKey?.toBase58() || '');
    setAccountPublicKey(bip44ExtendedKey?.neutered().toBase58() || '')
  };

  // TODO: spit react components
  return (
    <Container maxWidth="md">
      <Box my={10}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Collapse in={!!alertContent}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close" color="inherit"
                    size="small" onClick={() => {
                      setAlertContent('');
                    }}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
              >
                <AlertTitle>Error</AlertTitle>
                {alertContent}
              </Alert>
            </Collapse>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h3" component="h1" gutterBottom style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
              <Avatar alt="Bitcoin" src="/images/bitcoin.png" />&nbsp;&nbsp;Bitcoin playground
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h4" component="h1" gutterBottom style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
              Mnemonic
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Entropy"
                inputProps={{ 'aria-label': 'entropy' }}
                value={entropy}
              />
              <Select
                labelId="numbOfWords"
                id="numbOfWords"
                value={numbOfWords}
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
              <Divider className={classes.divider} orientation="vertical" />
              <IconButton className={classes.iconButton} aria-label="search" onClick={onGenerateClicked}>
                <LibraryBooks />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="phrase"
              label="BIP39 Mnemonic (Phrase)"
              multiline
              rows={4}
              value={words}
              onChange={onWordsChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="seed"
              label="BIP39 Seed"
              multiline
              rows={4}
              value={seed}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="bip32rootkey"
              label="BIP32 Root Key"
              multiline
              rows={4}
              value={rootKey}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider />
          </Grid>
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
              value={purpose}
              disabled
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="coin"
              label="Coin"
              value={coin}
              disabled
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="account"
              label="Account"
              value={account}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="change"
              label="External / Internal Change"
              value={change}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="derivationPath"
              label="Derivation Path"
              disabled
              value={derivationPath}
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
              value={bip32PrivateKey}
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
              value={bip32PublicKey}
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
              value={accountPrivateKey}
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
              value={accountPublicKey}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h4" component="h1" gutterBottom style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
              Derived Addresses
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <AddressList
              bip32DerivationPath={derivationPath}
              bip32RootKey={rootKey}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
