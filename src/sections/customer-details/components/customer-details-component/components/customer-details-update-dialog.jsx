import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { FormikProvider } from 'formik';
import { MobileNumberInput } from 'src/components/mobile-number-input/mobile-number-input';

export const CustomerDetailsUpdateDialog = ({
  isOpen,
  handleClose,
  formik,
  isLoading,
  handleSubmit,
}) => {
  const { touched, errors, getFieldProps } = formik;

  return (
    <Dialog open={isOpen} fullWidth sx={{ px: 2 }}>
      <DialogTitle>Update Customer</DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <Stack direction={'column'} spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Customer Name*"
              name="customerName"
              fullWidth
              {...getFieldProps('customerName')}
              error={Boolean(touched.customerName && errors.customerName)}
              helperText={touched.customerName && errors.customerName}
            />
            <TextField
              label="Customer Address*"
              name="customerAddress"
              fullWidth
              {...getFieldProps('customerAddress')}
              error={Boolean(touched.customerAddress && errors.customerAddress)}
              helperText={touched.customerAddress && errors.customerAddress}
            />
            <MobileNumberInput
              name="customerMobile"
              value={formik.values.customerMobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(touched.customerMobile && errors.customerMobile)}
              helperText={touched.customerMobile && errors.customerMobile}
              {...getFieldProps('customerMobile')}
            />
            <TextField
              label="Customer Land Line"
              name="customerLand"
              type="number"
              fullWidth
              {...getFieldProps('customerLand')}
            />
            <TextField
              label="Customer Email"
              name="customerEmail"
              fullWidth
              {...getFieldProps('customerEmail')}
            />
            <TextField
              label="Customer Location"
              name="customerLocation"
              fullWidth
              {...getFieldProps('customerLocation')}
            />
          </Stack>
        </FormikProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          color="inherit"
          disabled={isLoading}
          loading={isLoading}
          onClick={handleSubmit}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomerDetailsUpdateDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
