import React from 'react';
import { Collapse, Grid, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import { actionCreators, IMapState, mapState } from '../stores';
import { connect, useDispatch } from 'react-redux';
import { errorSlice } from '../stores/error-store';

export const _AlertBanner = ({ error }: IMapState) => {
  const dispatch = useDispatch();
  return (
    <Grid item xs={12} sm={12}>
      <Collapse in={!!error?.message}>
        <Alert
          severity='error'
          action={
            <IconButton
              aria-label='close' color='inherit'
              size='small' onClick={() => {
                dispatch(errorSlice.actions.setError({ message: '', stack: '' }));
              }}
            >
              <Close fontSize='inherit' />
            </IconButton>
          }
        >
          <AlertTitle>Error</AlertTitle>
          {error?.message}
        </Alert>
      </Collapse>
    </Grid>
  );
}

export const AlertBanner = connect(
  mapState,
  actionCreators
)(_AlertBanner);