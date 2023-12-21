import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { USERS } from 'src/_mock/users';

// ----------------------------------------------------------------------

export const JobTableRow = ({ jobs, handleClickJob }) => {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  // Function to find the name based on _id
  const findNameById = (userId) => {
    const user = USERS.find((user) => user._id === userId);
    return user ? user.userFullName : null;
  };

  return (
    <>
      <TableRow hover onClick={handleClickJob}>
        <TableCell component="th">
          <Typography variant="subtitle2" noWrap>
            {jobs.jobId}
          </Typography>
        </TableCell>

        <TableCell>{findNameById(jobs.jobUserId)}</TableCell>

        <TableCell>{jobs.jobScheduledDate}</TableCell>

        <TableCell>
          <Label color={(jobs.isServiced && 'success') || 'warning'}>
            {jobs.isServiced ? 'Serviced' : 'Pending'}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
};

JobTableRow.propTypes = {
  jobs: PropTypes.object.isRequired,
  handleClickJob: PropTypes.func.isRequired,
};
