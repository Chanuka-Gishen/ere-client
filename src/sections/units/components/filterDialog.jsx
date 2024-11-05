import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Divider, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { DatePicker } from '@mui/x-date-pickers';

export const FilterDialog = ({ filters, setFilters, handleChange, handleFilterByLink }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeDate = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      unitNextMaintenanceDate: value,
    }));
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} endIcon={<FilterListIcon />}>
        Filter
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Filter Options</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" rowGap={2}>
            <Typography>Filter by cutomer</Typography>
            <Box display="flex" flexDirection="row" gap={2}>
              <TextField
                margin="dense"
                id="customerName"
                name="customerName"
                label="Customer Name"
                fullWidth
                variant="outlined"
                value={filters.customerName}
                onChange={(e) => handleChange(e, 'customerName')}
              />
              <TextField
                margin="dense"
                id="customerMobileNumber"
                name="customerMobileNumber"
                label="Mobile Number"
                fullWidth
                variant="outlined"
                value={filters.customerMobileNumber}
                onChange={(e) => handleChange(e, 'customerMobileNumber')}
              />
            </Box>
            <Divider />
            <Typography>Filter by unit</Typography>
            <Box display="flex" flexDirection="row" gap={2}>
              <TextField
                margin="dense"
                id="unitSerialNo"
                name="unitSerialNo"
                label="Serial Number"
                fullWidth
                variant="outlined"
                value={filters.unitSerialNo}
                onChange={(e) => handleChange(e, 'unitSerialNo')}
              />
              <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                <ToggleButtonGroup
                  value={filters.qrCodeLinked}
                  exclusive
                  onChange={handleFilterByLink}
                >
                  <ToggleButton value={true} aria-label="True">
                    <Tooltip title="Units with Qr">
                      <LinkIcon />
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value={false} aria-label="False">
                    <Tooltip title="Units without Qr">
                      <LinkOffIcon />
                    </Tooltip>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
              <DatePicker
                fullWidth
                label="Maintainence Month"
                value={filters.unitNextMaintenanceDate}
                onChange={handleChangeDate}
                views={['year', 'month']}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                margin="dense"
                id="qrCode"
                name="qrCode"
                label="Qr Code"
                variant="outlined"
                value={filters.qrCode}
                onChange={(e) => handleChange(e, 'qrCode')}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
