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

export const SelectQrCodeView = ({
  isOpen,
  handleClose,
  isLoading,
  isLoadingAddQr,
  handleSubmit,
  codes,
  value,
  handleSelect,
}) => {
  return (
    <Dialog open={isOpen} fullWidth sx={{ px: 2 }}>
      <DialogTitle>Link QR code</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 5 }}>
          <Autocomplete
            options={codes}
            getOptionLabel={(option) => option.qrCodeName}
            onChange={(event, selectedOption) =>
              handleSelect(selectedOption ? selectedOption.qrCodeName : null)
            } // Handle option selection
            renderInput={(params) => <TextField {...params} label="Select QR code" />}
            disabled={isLoading || isLoadingAddQr}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          color="inherit"
          disabled={isLoading || isLoadingAddQr || value === null}
          loading={isLoading || isLoadingAddQr}
          onClick={handleSubmit}
        >
          Add Code
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SelectQrCodeView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingAddQr: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  codes: PropTypes.array,
  value: PropTypes.string,
  handleSelect: PropTypes.func.isRequired,
};
