import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { FormikProvider } from 'formik';

import { DatePicker } from '@mui/x-date-pickers';
import { COMPANIES, WORK_TYPE } from 'src/constants/common-constants';

export const AddCustomerJobDialog = ({ formik, isOpen, handleClose, isLoading, handleSubmit }) => {
  const { values, setFieldValue, getFieldProps, touched, errors } = formik;
  return (
    <Dialog open={isOpen} fullWidth sx={{ px: 2 }}>
      <DialogTitle>Add New Job</DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <Stack direction={'column'} spacing={2} sx={{ mt: 2 }}>
            <FormControl>
              <InputLabel id="select-label">Order Type*</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                label="Order Type"
                {...getFieldProps('workOrderType')}
              >
                <MenuItem value={WORK_TYPE.INSTALLATION}>Installation</MenuItem>
                <MenuItem value={WORK_TYPE.SERVICE}>Service</MenuItem>
                <MenuItem value={WORK_TYPE.REPAIR}>Repair</MenuItem>
              </Select>
              {Boolean(touched.workOrderType && errors.workOrderType) && (
                <FormHelperText>{touched.workOrderType && errors.workOrderType}</FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <InputLabel id="select-label">Company*</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                label="Company"
                {...getFieldProps('workOrderFrom')}
              >
                <MenuItem value={COMPANIES.CMP_ERE}>ERE</MenuItem>
                <MenuItem value={COMPANIES.CMP_SINGER}>Singer</MenuItem>
                <MenuItem value={COMPANIES.CMP_SINGER_DIR}>Singer Direct Pay</MenuItem>
                <MenuItem value={COMPANIES.CMP_SINHAGIRI}>Singhagiri</MenuItem>
                <MenuItem value={COMPANIES.CMP_SINHAGIRI_DIR}>Singhagiri Direct Pay</MenuItem>
              </Select>
              {Boolean(touched.workOrderFrom && errors.workOrderFrom) && (
                <FormHelperText>{touched.workOrderFrom && errors.workOrderFrom}</FormHelperText>
              )}
            </FormControl>
            <DatePicker
              label="Scheduled Date*"
              value={values.workOrderScheduledDate}
              onChange={(date) => setFieldValue('workOrderScheduledDate', date)}
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
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddCustomerJobDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
