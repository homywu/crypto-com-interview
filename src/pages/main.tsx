import React from 'react';
import {
  Box, Container, Typography, Avatar,
  Grid,
} from '@material-ui/core';

import { MnemonicSection } from '../pages/mnemonic';
import { DerivationPathSection } from '../pages/derivation-path';
import { AddressList } from './address-list';
import { AlertBanner } from './alert';

export const Main = () => {
  return (
    <Container maxWidth="md">
      <Box my={10}>
        <Grid container spacing={3}>
          <AlertBanner />
          <Grid item xs={12} sm={12}>
            <Typography variant="h3" component="h1" gutterBottom style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
              <Avatar alt="Bitcoin" src="/images/bitcoin.png" />&nbsp;&nbsp;Bitcoin playground
            </Typography>
          </Grid>
          <MnemonicSection />
          <DerivationPathSection />
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
            <AddressList />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
