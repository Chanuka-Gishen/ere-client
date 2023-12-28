import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, Typography } from '@mui/material';
import commonUtil from 'src/utils/common-util';

export const CustomerTableRow = ({ customer, handleClickRow }) => {
  return (
    <>
      <TableRow hover onClick={() => handleClickRow(customer._id)}>
        <TableCell component="th">
          <Typography variant="subtitle2" noWrap>
            {customer.customerName}
          </Typography>
        </TableCell>

        <TableCell>{customer.customerAddress}</TableCell>

        <TableCell>{customer.customerTel.mobile}</TableCell>

        <TableCell>
          {commonUtil.isUndefinedOrNull(customer.customerTel.landline)
            ? '-'
            : customer.customerTel.landline}
        </TableCell>
        <TableCell>
          {commonUtil.isUndefinedOrNull(customer.customerEmail) ? '-' : customer.customerEmail}
        </TableCell>
      </TableRow>
    </>
  );
};

CustomerTableRow.propTypes = {
  customer: PropTypes.object.isRequired,
  handleClickRow: PropTypes.func.isRequired,
};
