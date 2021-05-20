import React from 'react';
import { Divider, Grid, IconButton, InputBase, makeStyles, MenuItem, OutlinedInputProps, Paper, Select, TextField, Typography } from '@material-ui/core';
import { LibraryBooks } from '@material-ui/icons';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';

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

interface IMnemonicProps {
  entropy: string;
  numbOfWords: string;
  onNumbOfWordsChange: SelectInputProps['onChange'];
  words: string[];
  onWordsChange: OutlinedInputProps['onChange'];
  onGenerateClicked: () => void;
  seed: string;
  rootKey: string;
}

export const Mnemonic = (props: IMnemonicProps) => {
  const classes = useStyles();
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
          value={props.entropy}
        />
        <Select
          labelId='numbOfWords'
          id='numbOfWords'
          value={props.numbOfWords}
          onChange={props.onNumbOfWordsChange}
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
        <IconButton className={classes.iconButton} aria-label='search' onClick={props.onGenerateClicked}>
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
        value={props.words}
        onChange={props.onWordsChange}
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
        value={props.seed}
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
        value={props.rootKey}
        fullWidth
        variant='outlined'
      />
    </Grid>
  </>);
}