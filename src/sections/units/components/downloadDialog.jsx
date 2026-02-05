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
  Grid,
} from '@mui/material';
import { CMP_LIST } from 'src/constants/common-constants';

const DownloadUnitsExcelDialog = ({ open, onClose, isLoading, handleDownload }) => {
  const [type, setType] = useState('all');
  const [company, setCompany] = useState('all');

  const onSubmit = async () => {
    const params = {
      type,
      company,
    };

    await handleDownload(params);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Download Units Excel</DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <RadioGroup value={type} onChange={(e) => setType(e.target.value)}>
              <FormControlLabel value="missed" control={<Radio />} label="Missed Maintenance" />
              <FormControlLabel value="upcoming" control={<Radio />} label="Upcoming Maintenance" />
              <FormControlLabel value="all" control={<Radio />} label="All (Missed + Upcoming)" />
            </RadioGroup>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <RadioGroup value={company} onChange={(e) => setCompany(e.target.value)}>
              {CMP_LIST.map((cmp, index) => (
                <FormControlLabel key={index} value={cmp} control={<Radio />} label={cmp} />
              ))}
              <FormControlLabel value="all" control={<Radio />} label="All" />
            </RadioGroup>
          </Grid>
        </Grid>
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
