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
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { COMPANIES, WORK_STATUS, WORK_TYPE } from 'src/constants/common-constants';

export const JobUpdateDialog = ({
  formik,
  isOpen,
  handleClose,
  isLoading,
  handleSubmit,
  workOrder,
}) => {
  const { getFieldProps, touched, errors, values } = formik;

  return (
    <Dialog open={isOpen} fullWidth sx={{ px: 2 }}>
      <DialogTitle>Update Work Order</DialogTitle>
      <DialogContent>
        <Stack direction={'column'} spacing={2} sx={{ mt: 2 }}>
          {workOrder.workOrderStatus === WORK_STATUS.CREATED && (
            <>
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
              <DatePicker
                label="Scheduled Date*"
                value={formik.values.workOrderScheduledDate}
                onChange={(date) => formik.setFieldValue('workOrderScheduledDate', date)}
              />
            </>
          )}
          <FormControl>
            <InputLabel id="select-label">Company*</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              label="User Role"
              {...getFieldProps('workOrderFrom')}
            >
              <MenuItem value={COMPANIES.CMP_ERE}>ERE</MenuItem>
              <MenuItem value={COMPANIES.CMP_SINGER}>Singer</MenuItem>
            </Select>
            {Boolean(touched.workOrderFrom && errors.workOrderFrom) && (
              <FormHelperText>{touched.workOrderFrom && errors.workOrderFrom}</FormHelperText>
            )}
          </FormControl>
          {values.workOrderFrom === COMPANIES.CMP_SINGER && (
            <TextField
              name={`workOrderInvoiceNumber`}
              label={'Invoice Number'}
              fullWidth
              {...getFieldProps('workOrderInvoiceNumber')}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton
          variant="contained"
          color="inherit"
          disabled={isLoading}
          loading={isLoading}
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

JobUpdateDialog.propTypes = {
  formik: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
