import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  Tooltip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const SendRemainderDialog = ({ open, onClose, message, isLoading, onSubmit }) => {
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setShowCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCloseSnackbar = () => {
    setShowCopySuccess(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="remainder-dialog-title"
        aria-describedby="remainder-dialog-description"
      >
        <DialogTitle id="remainder-dialog-title">Customer Service Remainder</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <DialogContentText id="alert-dialog-description" sx={{ flex: 1 }}>
              {message}
            </DialogContentText>
            <Tooltip title="Copy message">
              <IconButton
                onClick={handleCopyMessage}
                size="small"
                sx={{ mt: -0.5 }}
                disabled={isLoading}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isLoading}
            loading={isLoading}
            onClick={onSubmit}
            autoFocus
          >
            Sent
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showCopySuccess}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Message copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default SendRemainderDialog;

SendRemainderDialog.propTypes = {
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
