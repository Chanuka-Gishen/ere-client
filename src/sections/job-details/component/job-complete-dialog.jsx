import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';

export const JobCompleteDialog = ({
  isOpen,
  handleClose,
  completedDate,
  handleChangeCompletedDate,
  handleSubmit,
  isLoading,
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Confirm Finish Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure that you want to finish this job task? Once proceed a new job task will be
          created for the next Maintenance. This cannot be undone.
          <FormControl fullWidth sx={{ mt: '20px' }}>
            <DatePicker
              label="Completed Date"
              value={completedDate}
              onChange={(newValue) => handleChangeCompletedDate(newValue)}
            />
          </FormControl>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
        <LoadingButton loading={isLoading} disabled={isLoading} onClick={handleSubmit} autoFocus>
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

JobCompleteDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
