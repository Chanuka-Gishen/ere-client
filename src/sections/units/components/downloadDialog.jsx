import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const DownloadUnitsExcelDialog = ({ open, onClose, isLoading, handleDownload }) => {
  const [type, setType] = useState('all');

  const onSubmit = async () => {
    await handleDownload(type);
    onclose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Download Units Excel</DialogTitle>

      <DialogContent>
        <RadioGroup value={type} onChange={(e) => setType(e.target.value)}>
          <FormControlLabel value="missed" control={<Radio />} label="Missed Maintenance" />
          <FormControlLabel value="upcoming" control={<Radio />} label="Upcoming Maintenance" />
          <FormControlLabel value="all" control={<Radio />} label="All (Missed + Upcoming)" />
        </RadioGroup>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onSubmit} disabled={isLoading}>
          {isLoading ? 'Downloading...' : 'Download Excel'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DownloadUnitsExcelDialog;
