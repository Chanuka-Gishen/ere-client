import React from 'react';
import PropTypes from 'prop-types';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const JobAssignDialog = ({
  isOpen,
  handleClose,
  isLoading,
  handleSubmit,
  selectedEmployees,
  employees,
  handleSelect,
  value,
  handleChange,
}) => {
  return (
    <Dialog open={isOpen} fullWidth sx={{ px: 2 }}>
      <DialogTitle>Assign Employees</DialogTitle>
      <DialogContent>
        <Stack direction={'column'} spacing={2} sx={{ mt: 2 }}>
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
          <Autocomplete
            multiple
            id="tags-outlined"
            options={employees}
            getOptionLabel={(option) => `${option.userFullName} - ${option.userRole}`}
            defaultValue={selectedEmployees}
            filterSelectedOptions
            isOptionEqualToValue={(option, value) => option._id === value._id}
            onChange={(e, value) => {
              handleSelect(value);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Employees" placeholder="Favorites" />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton
          variant="contained"
          color="inherit"
          disabled={isLoading}
          loading={isLoading}
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

JobAssignDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  employees: PropTypes.array.isRequired,
  defaultEmployees: PropTypes.array,
  handleSelect: PropTypes.func.isRequired,
};
