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
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { WORK_STATUS } from 'src/constants/common-constants';

export const JobUpdateDialog = ({
  workOrder,
  formik,
  isOpen,
  handleClose,
  isLoading,
  handleSubmit,
}) => {
  const { getFieldProps } = formik;

  return (
    <Dialog open={isOpen} fullWidth sx={{ px: 2 }}>
      <DialogTitle>Update Work Order</DialogTitle>
      <DialogContent>
        <Stack direction={'column'} spacing={2} sx={{ mt: 2 }}>
          {workOrder.workOrderStatus !== WORK_STATUS.COMPLETED && (
            <DatePicker
              label="Scheduled Date*"
              value={formik.values.workOrderScheduledDate}
              onChange={(date) => formik.setFieldValue('workOrderScheduledDate', date)}
            />
          )}

          {workOrder.workOrderStatus !== WORK_STATUS.CREATED && (
            <TextField
              label="Invoice Number"
              name={'workOrderInvoiceNumber'}
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
  workOrder: PropTypes.object.isRequired,
  formik: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
