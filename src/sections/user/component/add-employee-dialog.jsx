import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { FormikProvider } from 'formik';
import { USER_ROLE } from 'src/constants/user-role';

export const AddEmployeeDialog = ({ open, handleClose, formik, handleSubmitAddUser }) => {
  const { values, touched, errors, getFieldProps } = formik;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth sx={{ px: 2 }}>
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <Stack direction={'column'} spacing={2}>
            <TextField
              label="User Name"
              fullWidth
              variant="outlined"
              {...getFieldProps('userName')}
              error={Boolean(touched.userName && errors.userName)}
              helperText={touched.userName && errors.userName}
            />
            <FormControl>
              <InputLabel id="select-label">User Role</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                label="User Role"
                {...getFieldProps('userRole')}
              >
                <MenuItem value={USER_ROLE.ADMIN}>Admin</MenuItem>
                <MenuItem value={USER_ROLE.TECHNICIAN}>Technician</MenuItem>
                <MenuItem value={USER_ROLE.HELPER}>Helper</MenuItem>
              </Select>
            </FormControl>
            <Stack spacing={2} direction={'row'}>
              <TextField
                label="Password"
                fullWidth
                variant="outlined"
                {...getFieldProps('userPassword')}
                error={Boolean(touched.userPassword && errors.userPassword)}
                helperText={touched.userPassword && errors.userPassword}
              />
              <TextField
                label="Confirm Password"
                fullWidth
                variant="outlined"
                {...getFieldProps('userConfirmPassword')}
                error={Boolean(touched.userConfirmPassword && errors.userConfirmPassword)}
                helperText={touched.userConfirmPassword && errors.userConfirmPassword}
              />
            </Stack>
          </Stack>
        </FormikProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

AddEmployeeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  handleSubmitAddUser: PropTypes.func.isRequired,
};
