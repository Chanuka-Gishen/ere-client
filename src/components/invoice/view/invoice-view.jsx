import React from 'react';

import {
  Button,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { formatCurrency } from 'src/utils/format-number';
import { DownloadOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

export const InvoiceView = ({
  workOrder,
  unit,
  customer,
  invoice,
  handleDownloadPdf,
  isDownloading,
}) => {
  return (
    <>
      {invoice ? (
        <Stack direction="column" spacing={2}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <LoadingButton
              loading={isDownloading}
              startIcon={<DownloadOutlined />}
              variant="contained"
              onClick={handleDownloadPdf}
              disabled={isDownloading || !workOrder.workOrderInvoiceNumber}
            >
              PDF
            </LoadingButton>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <img
              src="/assets/ere-logo.jpg"
              alt="Logo"
              style={{
                maxWidth: 250, // Adjust the size as needed
                marginRight: 2,
              }}
            />
            <Stack direction="column" spacing={2}>
              <Typography fontWeight={'bold'} variant="h4">
                E R Engineers
              </Typography>
              <Typography>NO: 70/1A,, KORALAWELLA Road, KORALAWELLA, MORATUWA.</Typography>

              <Typography>0112645675 {'( WORKSHOP )'} | 0773878080 | 0716092000</Typography>
              <Typography>erengineersere@gmail.com</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="column" spacing={2}>
              <Typography fontWeight={'bold'}>Bill To:</Typography>
              <Typography>{customer.customerName}</Typography>
              <Typography fontWeight={'bold'}>Unit Reference:</Typography>
              <Typography>{`${unit.unitBrand}-${unit.unitModel}-${unit.unitSerialNo}`}</Typography>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Typography fontWeight={'bold'}>JobCode#</Typography>
              <Typography>{workOrder.workOrderCode}</Typography>
              <Typography fontWeight={'bold'}>Invoice#</Typography>
              <Typography>{workOrder.workOrderInvoiceNumber}</Typography>
              <Typography fontWeight={'bold'}>Completed Date#</Typography>
              <Typography>
                {workOrder.workOrderCompletedDate
                  ? new Date(workOrder.workOrderCompletedDate).toLocaleDateString({
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  : '-'}
              </Typography>
            </Stack>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell align="right">Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoice.items.length > 0 && (
                  <>
                    {invoice.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                          {item.item}
                        </TableCell>
                        <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                          {item.itemDescription}
                        </TableCell>
                        <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                          {item.itemQty}
                        </TableCell>
                        <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                          {formatCurrency(item.itemCost)}
                        </TableCell>
                        <TableCell
                          sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}
                          align="right"
                        >
                          {formatCurrency(item.itemQty * item.itemCost)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
                <TableRow>
                  <TableCell colSpan={4} sx={{ border: 'none' }} align="right" variant="th">
                    Labour Chargers
                  </TableCell>
                  <TableCell align="right" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                    {formatCurrency(invoice.labourCharges.amount)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} sx={{ border: 'none' }} align="right" variant="th">
                    Transport Chargers
                  </TableCell>
                  <TableCell align="right" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                    {formatCurrency(invoice.transportCharges.amount)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} sx={{ border: 'none' }} align="right" variant="th">
                    Other Chargers
                  </TableCell>
                  <TableCell align="right" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                    {formatCurrency(invoice.otherCharges.amount)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} sx={{ border: 'none' }} align="right" variant="th">
                    Grand Total
                  </TableCell>
                  <TableCell align="right" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                    {formatCurrency(invoice.grandTotal)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      ) : (
        <Stack justifyContent="center" alignItems="center">
          <Typography variant="h5">Invoice not created yet</Typography>
        </Stack>
      )}
    </>
  );
};
