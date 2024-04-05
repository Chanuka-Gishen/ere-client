import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, Typography } from '@mui/material';
import { fDate } from 'src/utils/format-time';
import { formatCurrency } from 'src/utils/format-number';

export const InvoicesRow = ({ invoice }) => {
  return (
    <>
      <TableRow hover>
        <TableCell>
          <Typography variant="subtitle2" fontWeight="bold" noWrap>
            {invoice.workOrderCode}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" fontWeight="bold">
            {invoice.workOrderInvoiceNumber}
          </Typography>
        </TableCell>
        <TableCell variant="subtitle2" fontWeight="bold">
          {invoice.workOrderFrom}
        </TableCell>
        <TableCell>{invoice.customer.customerName}</TableCell>
        <TableCell>{fDate(invoice.workOrderCompletedDate)}</TableCell>
        <TableCell>{formatCurrency(invoice.totalNetItemPrice)}</TableCell>
        <TableCell>{formatCurrency(invoice.totalGrossItemPrice)}</TableCell>
        <TableCell>{formatCurrency(invoice.serviceCharges.netAmount)}</TableCell>
        <TableCell>{formatCurrency(invoice.serviceCharges.amount)}</TableCell>
        <TableCell>
          {formatCurrency(
            invoice.otherCharges.netAmount +
              invoice.labourCharges.netAmount +
              invoice.transportCharges.netAmount
          )}
        </TableCell>
        <TableCell>
          {formatCurrency(
            invoice.otherCharges.amount +
              invoice.labourCharges.amount +
              invoice.transportCharges.amount
          )}
        </TableCell>
        <TableCell>{`${invoice.discount.percentage} %`}</TableCell>
        <TableCell>{formatCurrency(invoice.discount.amount)}</TableCell>
        <TableCell>{formatCurrency(invoice.grandNetTotal)}</TableCell>
        <TableCell>{formatCurrency(invoice.grandTotal)}</TableCell>
      </TableRow>
    </>
  );
};

InvoicesRow.propTypes = {
  invoice: PropTypes.object.isRequired,
};
