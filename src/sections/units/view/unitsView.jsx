import React from 'react';

import {
  Box,
  Button,
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
  Typography,
} from '@mui/material';
import { OrderByComponent } from '../components/orderByComponent';
import Scrollbar from 'src/components/scrollbar';
import { CustomTableHead } from 'src/components/custom-table/custom-table-head';
import TableLoadingRow from 'src/components/custom-table/table-loading-row';
import TableEmptyRow from 'src/components/custom-table/table-empty-row';
import commonUtil from 'src/utils/common-util';
import { fDate, fDateYearMonthFormat } from 'src/utils/format-time';
import { FilterDialog } from '../components/filterDialog';
import { DownloadRounded } from '@mui/icons-material';
import DownloadUnitsExcelDialog from '../components/downloadDialog';

const CustomCell = ({ children, ...props }) => {
  return (
    <TableCell sx={{ borderBottom: 'none' }} {...props}>
      {children}
    </TableCell>
  );
};

export const UnitsView = ({
  headerLabels,
  isLoading,
  filters,
  setFilters,
  handleChangeFilters,
  handleFilterByLink,
  handleDeleteFilterItems,
  data,
  downloadExcelSheet,
  isLoadingExcel,
  isOpenDownload,
  handleToggleDownload,
  page,
  documentCount,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} sx={{ mt: '10px' }}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <FilterDialog
              filters={filters}
              setFilters={setFilters}
              handleChange={handleChangeFilters}
              handleFilterByLink={handleFilterByLink}
            />
            <OrderByComponent
              filters={filters}
              setFilters={setFilters}
              handleSelect={handleChangeFilters}
            />
            <Button variant="outlined" onClick={handleToggleDownload} endIcon={<DownloadRounded />}>
              Excel
            </Button>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography variant="h6">Registered Units</Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <Stack direction="row" spacing={2}>
            {filters.customerName && (
              <Chip
                label={filters.customerName}
                onDelete={() => {
                  handleDeleteFilterItems('customerName');
                }}
              />
            )}
            {filters.customerMobileNumber && (
              <Chip
                label={filters.customerMobileNumber}
                onDelete={() => {
                  handleDeleteFilterItems('customerMobileNumber');
                }}
              />
            )}
            {filters.qrCode && (
              <Chip
                label={filters.qrCode}
                onDelete={() => {
                  handleDeleteFilterItems('qrCode');
                }}
              />
            )}
            {filters.unitSerialNo && (
              <Chip
                label={filters.unitSerialNo}
                onDelete={() => {
                  handleDeleteFilterItems('unitSerialNo');
                }}
              />
            )}
            {filters.unitNextMaintenanceDate && (
              <Chip
                label={fDateYearMonthFormat(filters.unitNextMaintenanceDate)}
                onDelete={() => {
                  handleDeleteFilterItems('unitNextMaintenanceDate');
                }}
              />
            )}
            {filters.qrCodeLinked != null && (
              <Chip
                label={filters.qrCodeLinked ? 'Units with QR' : 'Units without QR'}
                onDelete={() => {
                  handleDeleteFilterItems('qrCodeLinked');
                }}
              />
            )}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <Box display="flex" flexDirection="column" rowGap={2}>
            <Scrollbar>
              <Card>
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
                                <TableRow
                                  hover
                                  key={index}
                                  onClick={() => handleRowClick(item._id)}
                                >
                                  <CustomCell component={'th'}>
                                    {item.customer.customerName}
                                  </CustomCell>
                                  <CustomCell>{item.customer.customerTel.mobile}</CustomCell>
                                  <CustomCell>
                                    {`${item.unitBrand} - ${item.unitModel} - ${item.unitSerialNo}`}
                                  </CustomCell>
                                  <CustomCell>{fDate(item.unitLastMaintenanceDate)}</CustomCell>
                                  <CustomCell
                                    sx={{
                                      color:
                                        commonUtil.calculateMonthDifference(
                                          item.unitNextMaintenanceDate
                                        ) && item.unitNextMaintenanceDate
                                          ? 'red'
                                          : 'black',
                                    }}
                                  >
                                    {fDate(item.unitNextMaintenanceDate)}
                                  </CustomCell>
                                  <CustomCell>
                                    {item.unitQrCode ? item.qrCode.qrCodeName : '-'}
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
              </Card>
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
          </Box>
        </Grid>
      </Grid>
      {isOpenDownload && (
        <DownloadUnitsExcelDialog
          open={isOpenDownload}
          onClose={handleToggleDownload}
          isLoading={isLoadingExcel}
          handleDownload={downloadExcelSheet}
        />
      )}
    </Container>
  );
};
