import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from '@mui/material';

export const AddTipDialog = ({
  value,
  isOpen,
  handleClose,
  handleChange,
  isLoading,
  handleSubmit,
}) => {
  return (
    <Dialog open={isOpen} fullWidth sx={{ px: 2 }}>
      <DialogTitle>Employee Tip</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%', mt: 2 }}>
          <TextField
            fullWidth
            label="Tip"
            name={'employeeTip'}
            type="number"
            value={value}
            InputProps={{
              startAdornment: <InputAdornment position="start">Rs. </InputAdornment>,
            }}
            onChange={(e) => handleChange(e.target.value)}
            disabled={isLoading}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          color="inherit"
          disabled={isLoading || value <= 0}
          loading={isLoading}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddTipDialog.propTypes = {
  value: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
