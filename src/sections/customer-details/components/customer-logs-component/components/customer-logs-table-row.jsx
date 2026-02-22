import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@mui/material';
import { fDate } from 'src/utils/format-time';

export const CustomerLogsTableRow = ({ log }) => {
  return (
    <>
      <TableRow hover sx={{ cursor: 'pointer' }}>
        <TableCell>{log.logsType}</TableCell>
        <TableCell>{fDate(log.createdAt)}</TableCell>
      </TableRow>
    </>
  );
};

CustomerLogsTableRow.propTypes = {
  log: PropTypes.object.isRequired,
};
