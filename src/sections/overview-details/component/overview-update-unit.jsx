import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';

export const OverviewUpdateUnit = ({ isOpen, handleClose, formik, isLoading, handleSubmit }) => {
  const { getFieldProps } = formik;

  return (
    <Dialog open={isOpen} fullWidth sx={{ px: 2 }}>
      <DialogTitle>Update Details</DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <TextField
            sx={{ mt: 2 }}
            label="Unit Serial No"
            name={'unitSerialNo'}
            fullWidth
            {...getFieldProps('unitSerialNo')}
          />
        </FormikProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton
          variant="contained"
          color="inherit"
          disabled={isLoading || formik.values.unitSerialNo === ''}
          loading={isLoading}
          onClick={handleSubmit}
        >
          Update
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

OverviewUpdateUnit.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
