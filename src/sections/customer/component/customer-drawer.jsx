import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Divider,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { MobileNumberInput } from 'src/components/mobile-number-input/mobile-number-input';

const validationSchemaAddCust = Yup.object().shape({
  customerName: Yup.string().required('Full Name is required'),
  customerAddress: Yup.string().required('Address is required'),
  customerMobile: Yup.string()
    .transform((value) => value?.replace(/\s/g, ''))
    .matches(/^(\+?\d{1,3}[- ]?)?\d{9}$/, 'Invalid mobile number (9 digits required)')
    .required('Mobile number is required'),
  customerLand: Yup.string().notRequired(),
  customerEmail: Yup.string().email('Invalid email format').nullable().notRequired(),
});

export const CustomerDrawer = ({ isOpen, handleClose, isLoading, onSubmit }) => {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      PaperProps={{
        sx: { width: 380, border: 'none', overflow: 'hidden' },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1, py: 2 }}
      >
        <Typography variant="h6">Enter details</Typography>
        <IconButton onClick={handleClose}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </Stack>

      <Divider />

      <Formik
        initialValues={{
          customerName: '',
          customerAddress: '',
          customerMobile: '',
          customerLand: '',
          customerEmail: '',
        }}
        validationSchema={validationSchemaAddCust}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values, resetForm);
        }}
      >
        {({
          errors,
          touched,
          values,
          handleSubmit,
          getFieldProps,
          handleChange,
          handleBlur,
          isValid,
        }) => (
          <form onSubmit={handleSubmit}>
            <Scrollbar>
              <Stack direction={'column'} spacing={3} sx={{ px: 1, py: 2 }}>
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
                  required={true}
                  value={values.customerMobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  error={Boolean(touched.customerLand && errors.customerLand)}
                  helperText={touched.customerLand && errors.customerLand}
                />
                <TextField
                  label="Customer Email"
                  name="customerEmail"
                  fullWidth
                  {...getFieldProps('customerEmail')}
                  error={Boolean(touched.customerEmail && errors.customerEmail)}
                  helperText={touched.customerEmail && errors.customerEmail}
                />
              </Stack>
            </Scrollbar>
            <Card>
              <Stack direction="row" spacing={1} sx={{ p: 3 }}>
                <Button variant="contained" fullWidth color="inherit" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  loading={isLoading}
                  disabled={isLoading || !isValid}
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  Submit
                </Button>
              </Stack>
            </Card>
          </form>
        )}
      </Formik>
    </Drawer>
  );
};

CustomerDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
