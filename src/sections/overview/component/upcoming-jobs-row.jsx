import React from 'react';
import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export const UpcomingJobsRow = ({ jobs }) => {
  return (
    <>
      <TableRow hover>
        <TableCell>{jobs.customer.customerName}</TableCell>
        <TableCell>{jobs.customer.customerTel.mobile}</TableCell>
        <TableCell component="th">{fDate(jobs.unit.unitNextMaintenanceDate)}</TableCell>
      </TableRow>
    </>
  );
};

UpcomingJobsRow.propTypes = {
  jobs: PropTypes.object.isRequired,
};
