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
  useMediaQuery,
} from '@mui/material';
import { formatCurrency } from 'src/utils/format-number';
import { DownloadOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { fDate } from 'src/utils/format-time';
import { COMPANIES } from 'src/constants/common-constants';

export const InvoiceView = ({
  workOrder,
  unit,
  customer,
  invoice,
  handleDownloadPdf,
  isDownloading,
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');

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
              disabled={isDownloading || !workOrder.workOrderInvoice}
            >
              PDF
            </LoadingButton>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems={isMobile ? 'start' : 'center'}
          >
            <img
              src="/assets/ere-logo.jpg"
              alt="Logo"
              style={{
                maxWidth: isMobile ? 100 : 250, // Adjust the size as needed
                marginRight: 2,
              }}
            />
            <Stack direction="column" spacing={isMobile ? 1 : 2}>
              <Typography fontWeight={'bold'} variant={isMobile ? 'h3' : 'h2'}>
                E R Engineers
              </Typography>
              <Typography variant={isMobile ? 'h7' : 'h4'}>
                NO: 70/1A,, KORALAWELLA Road, KORALAWELLA, MORATUWA.
              </Typography>

              <Typography variant={isMobile ? 'h7' : 'h4'}>
                0112645675 {'( WORKSHOP )'} | 0773878080 | 0716092000
              </Typography>
              <Typography variant={isMobile ? 'h7' : 'h4'}>erengineersere@gmail.com</Typography>
              {[COMPANIES.CMP_SINGER, COMPANIES.CMP_SINGER_DIR].includes(
                workOrder.workOrderFrom
              ) && (
                <Stack direction="row" spacing={isMobile ? 1 : 2}>
                  <img
                    src="/assets/abans.jpg"
                    alt="Logo"
                    style={{
                      maxWidth: isMobile ? 80 : 150, // Adjust the size as needed
                      marginRight: 2,
                    }}
                  />
                  <Typography variant={isMobile ? 'h7' : 'h4'}>Authorized Agent</Typography>
                </Stack>
              )}
            </Stack>
          </Stack>
          <Divider />
          {[COMPANIES.CMP_SINHAGIRI, COMPANIES.CMP_SINHAGIRI_DIR].includes(
            workOrder.workOrderFrom
          ) && (
            <Typography fontWeight={'bold'} variant={isMobile ? 'h6' : 'h4'}>
              Singhagiri (Pvt) Ltd
            </Typography>
          )}
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="column" spacing={isMobile ? 1 : 2}>
              <Typography fontWeight={'bold'} variant={isMobile ? 'h7' : 'body1'}>
                Bill To:
              </Typography>
              <Typography variant={isMobile ? 'h7' : 'body1'}>{customer.customerName}</Typography>
              {[COMPANIES.CMP_SINHAGIRI, COMPANIES.CMP_SINHAGIRI_DIR].includes(
                workOrder.workOrderFrom
              ) && (
                <>
                  <Typography fontWeight={'bold'} variant={isMobile ? 'h7' : 'body1'}>
                    Job Site:
                  </Typography>
                  <Typography variant={isMobile ? 'h7' : 'body1'}>
                    {customer.customerAddress}
                  </Typography>
                  <Typography fontWeight={'bold'} variant={isMobile ? 'h7' : 'body1'}>
                    Contact Number:
                  </Typography>
                  <Typography variant={isMobile ? 'h7' : 'body1'}>
                    {customer.customerTel.mobile ? customer.customerTel.mobile : ' - '}
                  </Typography>
                </>
              )}
              <Typography fontWeight={'bold'} variant={isMobile ? 'h7' : 'body1'}>
                Unit Reference:
              </Typography>
              <Typography variant={isMobile ? 'h7' : 'body1'}>
                {' '}
                {`${unit.unitBrand}-${unit.unitModel}-${unit.unitSerialNo}`}
              </Typography>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Typography fontWeight={'bold'} variant={isMobile ? 'h7' : 'body1'}>
                JobCode#
              </Typography>
              <Typography variant={isMobile ? 'h7' : 'body1'}>{workOrder.workOrderCode}</Typography>
              <Typography fontWeight={'bold'} variant={isMobile ? 'h7' : 'body1'}>
                Invoice#
              </Typography>
              <Typography variant={isMobile ? 'h7' : 'body1'}>
                {workOrder.workOrderInvoice.invoiceNumber}
              </Typography>
              <Typography fontWeight={'bold'} variant={isMobile ? 'h7' : 'body1'}>
                Completed Date#
              </Typography>
              <Typography variant={isMobile ? 'h7' : 'body1'}>
                {fDate(workOrder.workOrderCompletedDate)}
              </Typography>
            </Stack>
          </Stack>
          {![COMPANIES.CMP_SINHAGIRI, COMPANIES.CMP_SINGER].includes(workOrder.workOrderFrom) && (
            <>
              <Divider />
              <Stack spacing={isMobile ? 1 : 2}>
                <Typography fontWeight={'bold'} variant={isMobile ? 'h7' : 'body1'}>
                  Bank account details
                </Typography>
                <Stack direction="row" spacing={isMobile ? 1 : 2}>
                  <Typography fontWeight={'bold'} variant={isMobile ? 'h7' : 'body1'}>
                    Bank name
                  </Typography>
                  <Typography variant={isMobile ? 'h7' : 'body1'}>
                    Nations Trust Bank - Moratuwa
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={isMobile ? 1 : 2}>
                  <Typography fontWeight={'bold'} variant={isMobile ? 'h7' : 'body1'}>
                    Account holder name
                  </Typography>
                  <Typography variant={isMobile ? 'h7' : 'body1'}>ER Engineers</Typography>
                </Stack>
                <Stack direction="row" spacing={isMobile ? 1 : 2}>
                  <Typography fontWeight={'bold'} variant={isMobile ? 'h7' : 'body1'}>
                    Account number
                  </Typography>
                  <Typography variant={isMobile ? 'h7' : 'body1'}>014212025778</Typography>
                </Stack>
              </Stack>
            </>
          )}

          <Divider />
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
                          {formatCurrency(item.itemGrossPrice)}
                        </TableCell>
                        <TableCell
                          sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}
                          align="right"
                        >
                          {formatCurrency(item.itemQty * item.itemGrossPrice)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
                <TableRow>
                  <TableCell colSpan={4} sx={{ border: 'none' }} align="right" variant="th">
                    Service Chargers
                  </TableCell>
                  <TableCell align="right" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                    {formatCurrency(invoice.serviceCharges.amount)}
                  </TableCell>
                </TableRow>
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
                    Discount
                  </TableCell>
                  <TableCell align="right" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                    {`${invoice.discount.percentage} %`}
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
