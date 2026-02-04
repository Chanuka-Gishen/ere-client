import React from 'react';
import PropTypes from 'prop-types';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

export const OverviewUpdateQrCode = ({
  isOpen,
  handleClose,
  isLoading,
  handleSubmit,
  codes,
  value,
  handleSelect,
}) => {
  return (
    <Dialog open={isOpen} fullWidth sx={{ px: 2 }}>
      <DialogTitle>Link QR code</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Autocomplete
            options={codes}
            getOptionLabel={(option) => option.qrCodeName}
            onChange={(event, selectedOption) =>
              handleSelect(selectedOption ? selectedOption.qrCodeName : null)
            } // Handle option selection
            renderInput={(params) => <TextField {...params} label="Select QR code" />}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          color="inherit"
          disabled={isLoading || value === null}
          loading={isLoading}
          onClick={handleSubmit}
        >
          Add Code
        </Button>
      </DialogActions>
    </Dialog>
  );
};

OverviewUpdateQrCode.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  codes: PropTypes.array,
  value: PropTypes.string,
  handleSelect: PropTypes.func.isRequired,
};
