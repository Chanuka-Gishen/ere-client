import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Chip,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import { CustomTableHead } from 'src/components/custom-table/custom-table-head';
import TableLoadingRow from 'src/components/custom-table/table-loading-row';
import TableEmptyRow from 'src/components/custom-table/table-empty-row';
import commonUtil from 'src/utils/common-util';
import { fDate } from 'src/utils/format-time';
import { WORK_STATUS, WORK_TYPE } from 'src/constants/common-constants';
import Label from 'src/components/label';
import SearchInput from 'src/components/search-input/search-input';
import { useResponsive } from 'src/hooks/use-responsive';

// ---------------------------------------------------------------------------

const CustomCell = ({ children, ...props }) => {
  return (
    <TableCell sx={{ borderBottom: 'none' }} {...props}>
      {children}
    </TableCell>
  );
};

export const WorkOrdrsView = ({
  isLoading,
  headerLabels,
  data,
  handleRowClick,
  page,
  documentCount,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleChangeSearchParam,
  searchParams,
}) => {
  const isMobile = useResponsive('down', 'lg');
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" mb={5}>
        Work Orders
      </Typography>

      <Card>
        <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ p: 2 }}>
          <Grid item xs={12} sm={3}>
            <SearchInput
              filterName={searchParams.name}
              onFilterName={(e) => handleChangeSearchParam('name', e)}
              placeholder="Search Customer Name..."
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <SearchInput
              filterName={searchParams.mobile}
              onFilterName={(e) => handleChangeSearchParam('mobile', e)}
              placeholder="Search Mobile..."
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <SearchInput
              filterName={searchParams.jobCode}
              onFilterName={(e) => handleChangeSearchParam('jobCode', e)}
              placeholder="Search Job Code..."
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <SearchInput
              filterName={searchParams.qrCode}
              onFilterName={(e) => handleChangeSearchParam('qrCode', e)}
              placeholder="Search QR Code..."
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <SearchInput
              filterName={searchParams.serial}
              onFilterName={(e) => handleChangeSearchParam('serial', e)}
              placeholder="Search Serial No..."
            />
          </Grid>
        </Grid>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <CustomTableHead headLabel={headerLabels} enableAction={false} />
              <TableBody>
                {isLoading ? (
                  <TableLoadingRow colSpan={headerLabels.length} />
                ) : (
                  <>
                    {data.length === 0 ? (
                      <TableEmptyRow colSpan={headerLabels.length} />
                    ) : (
                      <>
                        {data.map((item, index) => (
                          <TableRow hover key={index} onClick={() => handleRowClick(item._id)}>
                            <CustomCell component={'th'}>{item.workOrderCode}</CustomCell>
                            <CustomCell>{item.workOrderFrom}</CustomCell>
                            <CustomCell sx={{ width: 200 }}>
                              {item.customer.customerName}
                            </CustomCell>
                            <CustomCell sx={{ width: 200 }}>
                              {item.customer.customerTel.mobile}
                            </CustomCell>
                            <CustomCell>
                              {item.unit.unitQrCode ? item.unit.unitQrCode.qrCodeName : '-'}
                            </CustomCell>
                            <CustomCell sx={{ width: 200 }}>{item.unit.unitSerialNo}</CustomCell>
                            <CustomCell
                              sx={{
                                color:
                                  commonUtil.calculateMonthDifference(
                                    item.workOrderScheduledDate
                                  ) && item.workOrderStatus === WORK_STATUS.CREATED
                                    ? 'red'
                                    : 'black',
                              }}
                            >
                              {fDate(item.workOrderScheduledDate)}
                            </CustomCell>
                            <CustomCell>
                              <Label
                                color={
                                  item.workOrderType === WORK_TYPE.SERVICE ? 'success' : 'warning'
                                }
                              >
                                {item.workOrderType}
                              </Label>
                            </CustomCell>
                            <CustomCell>
                              <Label
                                color={
                                  item.workOrderStatus === WORK_STATUS.CREATED
                                    ? 'default'
                                    : item.workOrderStatus === WORK_STATUS.COMPLETED
                                      ? 'success'
                                      : 'warning'
                                }
                              >
                                {item.workOrderStatus}
                              </Label>
                            </CustomCell>
                            <CustomCell>
                              {item.workOrderCompletedDate
                                ? fDate(item.workOrderCompletedDate)
                                : '--'}
                            </CustomCell>
                            <CustomCell>
                              {item.workOrderInvoice ? item.invoice.invoiceNumber : '--'}
                            </CustomCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={documentCount}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10, 20, 30]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};
