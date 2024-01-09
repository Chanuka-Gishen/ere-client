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
import { FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { UNIT_STATUS } from 'src/constants/common-constants';

export const CustomerUnitAddDialog = ({
  isAdd,
  isOpen,
  handleClose,
  formik,
  isLoading,
  handleSubmit,
  handleDateChange,
  handleLastMaintainenceDateChange,
}) => {
  const { touched, errors, getFieldProps } = formik;

  return (
    <Dialog open={isOpen} fullWidth sx={{ px: 2 }}>
      <DialogTitle>{isAdd ? 'Add' : 'Update'} AC Unit</DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <Stack direction={'column'} spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Unit Model*"
              name={'unitModel'}
              {...getFieldProps('unitModel')}
              error={Boolean(touched.unitModel && errors.unitModel)}
              helperText={touched.unitModel && errors.unitModel}
            />
            <TextField
              label="Unit Serial No*"
              name={'unitSerialNo'}
              {...getFieldProps('unitSerialNo')}
              error={Boolean(touched.unitSerialNo && errors.unitSerialNo)}
              helperText={touched.unitSerialNo && errors.unitSerialNo}
            />
            <Stack direction={'row'} spacing={1}>
              <DatePicker
                label="Installation Date*"
                value={formik.values.unitInstalledDate}
                onChange={(date) => handleDateChange(date)}
              />
              {isAdd ? (
                <DatePicker
                  label="Next Maintenance Date*"
                  value={formik.values.unitNextMaintenanceDate}
                  onChange={(date) => formik.setFieldValue('unitNextMaintenanceDate', date)}
                />
              ) : (
                <DatePicker
                  label="Last Maintenance Date*"
                  value={formik.values.unitLastMaintenanceDate}
                  onChange={(date) => handleLastMaintainenceDateChange(date)}
                />
              )}
            </Stack>
            {!isAdd && (
              <Stack direction={'row'} spacing={2}>
                <DatePicker
                  label="Next Maintenance Date*"
                  value={formik.values.unitNextMaintenanceDate}
                  onChange={(date) => formik.setFieldValue('unitNextMaintenanceDate', date)}
                />
                <FormControl fullWidth>
                  <InputLabel id="select-label">Unit Status*</InputLabel>
                  <Select
                    fullWidth
                    labelId="select-label"
                    id="select"
                    label="Unit Status"
                    {...getFieldProps('unitStatus')}
                  >
                    <MenuItem value={UNIT_STATUS.ACTIVE}>Active</MenuItem>
                    <MenuItem value={UNIT_STATUS.INACTIVE}>Inactive</MenuItem>
                  </Select>
                  {Boolean(touched.unitStatus && errors.unitStatus) && (
                    <FormHelperText>{touched.unitStatus && errors.unitStatus}</FormHelperText>
                  )}
                </FormControl>
              </Stack>
            )}
          </Stack>
        </FormikProvider>
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
          {isAdd ? 'Submit' : 'Update'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

CustomerUnitAddDialog.propTypes = {
  isAdd: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
};
