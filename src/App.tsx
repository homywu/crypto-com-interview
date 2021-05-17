import React, { useState } from 'react';
import {
  Box, Container, Typography, Avatar,
  Grid, Paper, IconButton,
  InputBase, Divider, makeStyles, Select, MenuItem, Collapse
} from '@material-ui/core';
import * as _ from 'lodash';
import { Close, LibraryBooks } from '@material-ui/icons';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import { Alert } from '@material-ui/lab';
import { Mnemonic } from './libs/mnemonic';

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
  // const []

  const onNumbOfWordsChange: SelectInputProps['onChange'] = (e) => {
    if (_.isNumber(e.target.value)) {
      setNumberOfWords(e.target.value);
    }
  };

  const onGenerateClicked = () => {
    if (!window.crypto) {
      setAlertContent('The current browser does not support strong randomness.');
    }
    const generatedInfo = generate(numbOfWords);
    setWords(generatedInfo.words);
    setEntropy(generatedInfo.entropy)
  };

  return (
    <Container maxWidth="md">
      <Box my={10}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h4" component="h1" gutterBottom style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
              <Avatar alt="Bitcoin" src="/images/bitcoin.png" /> Bitcoin playground
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
            <Collapse in={!!alertContent}>
              <Alert
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
                {alertContent}
              </Alert>
            </Collapse>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="BIP39 Mnemonic (Phrase)"
                inputProps={{ 'aria-label': 'entropy' }}
                value={words}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
