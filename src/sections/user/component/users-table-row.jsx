import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, MenuItem, Popover } from '@mui/material';
import Iconify from 'src/components/iconify';

export const UsersTableRow = ({ employee }) => {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  return (
    <>
      <TableRow hover>
        <TableCell component="th">
          <Typography variant="subtitle2" noWrap>
            {employee.employeeName}
          </Typography>
        </TableCell>

        <TableCell>{employee.employeeRole}</TableCell>

        <TableCell>{employee.employeeMoileNo}</TableCell>

        <TableCell>{employee.employeeNIC}</TableCell>

        <TableCell>{employee.employeeEmail}</TableCell>
        <TableCell>{employee.employeeDOB}</TableCell>
        <TableCell>{employee.employeeNIC}</TableCell>
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

UsersTableRow.propTypes = {
  employee: PropTypes.array,
};
