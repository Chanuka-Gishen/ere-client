import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, Typography } from '@mui/material';
import { fDate } from 'src/utils/format-time';

export const LogsTableRow = ({ log }) => {

  return (
    <>
      <TableRow hover>
        <TableCell component="th">
          <Typography variant="subtitle2" noWrap>
            {log.customer.customerName}
          </Typography>
        </TableCell>
        <TableCell>{log.logsType}</TableCell>
        <TableCell>{fDate(log.createdAt)}</TableCell>
      </TableRow>
    </>
  );
};

LogsTableRow.propTypes = {
  log: PropTypes.object.isRequired,
};
