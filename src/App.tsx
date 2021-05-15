import React from 'react';
import { Box, TextField, Container, Typography, Avatar, FormControlLabel, Checkbox, Grid, Paper, IconButton, InputBase, Divider, makeStyles, Select, MenuItem } from '@material-ui/core';
import { LibraryBooks } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
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

export default function App() {
  const classes = useStyles();
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
                placeholder="Generate random mnemonic"
                inputProps={{ 'aria-label': 'generate random mnemonic' }}
              />
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={15}
              // onChange={handleChange}
              // input={<BootstrapInput />}
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
              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <LibraryBooks />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
