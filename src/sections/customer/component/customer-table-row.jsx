import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, Typography } from '@mui/material';

export const CustomerTableRow = ({ customer }) => {
  return (
    <>
      <TableRow hover>
        <TableCell component="th">
          <Typography variant="subtitle2" noWrap>
            {customer.userFullName}
          </Typography>
        </TableCell>

        <TableCell>{customer.userAddress}</TableCell>

        <TableCell>{customer.userPhoneNumber}</TableCell>

        <TableCell>{customer.userEmail}</TableCell>
      </TableRow>
    </>
  );
};

CustomerTableRow.propTypes = {
  customer: PropTypes.object.isRequired,
};
