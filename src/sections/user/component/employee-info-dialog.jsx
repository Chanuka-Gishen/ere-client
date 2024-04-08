import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Stack,
  Typography,
} from '@mui/material';

export const EmployeeInfoDialog = ({ open, data, handleClose, isLoading }) => {
  return (
    <Dialog open={open} fullWidth sx={{ px: 2 }}>
      <DialogTitle>Employee Info</DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={2}>
          <Typography variant="subtitle1">Total tips for previous month</Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {isLoading ? 'Loading...' : data}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

EmployeeInfoDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
