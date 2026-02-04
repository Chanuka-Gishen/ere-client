import React from 'react';

import PropTypes from 'prop-types';

import {
  Button,
  Card,
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

import Iconify from 'src/components/iconify';
import { CustomerDrawer } from '../component/customer-drawer';
import Scrollbar from 'src/components/scrollbar';
import { CustomTableHead } from 'src/components/custom-table/custom-table-head';
import { CustomerTableRow } from '../component/customer-table-row';
import TableLoadingRow from 'src/components/custom-table/table-loading-row';
import TableEmptyRow from 'src/components/custom-table/table-empty-row';
import CustomerSearchBar from '../component/customer-search-bar';
import { fDate, getDaysDifference } from 'src/utils/format-time';
import { LogsTableRow } from '../component/logs-table-row';

export const CustomerView = ({
  searchTerm,
  handleSearchInputChange,
  headerLabels,
  headerLabelsLogs,
  isLoading,
  isLoadingLogs,
  customers,
  logs,
  openAddCust,
  handleOpenAddCustomer,
  handleCloseAddCustomer,
  formik,
  page,
  documentCount,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  logsPage,
  logsCount,
  logsRowsPerPage,
  handleChangePageLogs,
  handleChangeRowsPerPageLogs,
  isLoadingAddCustomer,
  handleSubmitNewCust,
  handleClickRow,
}) => {
  return (
    <Container maxWidth="xl">
      <Grid container rowGap={3} spacing={3}>
        <Grid size={12}>
          <Typography variant="h4">Manage Customers</Typography>
        </Grid>
        <Grid size={{ xl: 8, md: 12 }}>
          <Card>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 5, pr: '10px' }}
            >
              <CustomerSearchBar filterName={searchTerm} onFilterName={handleSearchInputChange} />

              <Button
                variant="contained"
                color="inherit"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={handleOpenAddCustomer}
              >
                New Customer
              </Button>
            </Stack>

            <Scrollbar>
              <TableContainer sx={{ overflow: 'unset' }}>
                <Table sx={{ minWidth: 800 }}>
                  <CustomTableHead headLabel={headerLabels} enableAction={false} />
                  {isLoading ? (
                    <TableBody>
                      <TableLoadingRow colSpan={headerLabels.length} />
                    </TableBody>
                  ) : (
                    <TableBody>
                      {customers.length === 0 ? (
                        <TableEmptyRow colSpan={headerLabels.length} />
                      ) : (
                        <>
                          {customers.map((row) => (
                            <CustomerTableRow
                              customer={row}
                              key={row._id}
                              handleClickRow={handleClickRow}
                            />
                          ))}
                        </>
                      )}
                      {customers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={headerLabels.length} align="center">
                            {`No results found for "${searchTerm}"`}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
            <TablePagination
              page={page}
              component="div"
              count={documentCount}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Grid>
        <Grid size={{ xl: 4, md: 12 }}>
          <Card>
            <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
              <Typography variant="h6">Reminders</Typography>

              <Typography variant="caption">
                Last Checked On : {logs.length > 0 ? fDate(new Date()) : ' - '}
                {`${logs.length > 0 ? getDaysDifference(new Date()) : ' - '} Days ago`}
              </Typography>
            </Container>
            <Scrollbar>
              <TableContainer sx={{ overflow: 'unset' }}>
                <Table>
                  <CustomTableHead headLabel={headerLabelsLogs} enableAction={false} />
                  {isLoadingLogs ? (
                    <TableBody>
                      <TableLoadingRow colSpan={headerLabelsLogs.length} />
                    </TableBody>
                  ) : (
                    <TableBody>
                      {logs.length === 0 ? (
                        <TableEmptyRow colSpan={headerLabelsLogs.length} />
                      ) : (
                        <>
                          {logs.map((row, index) => (
                            <LogsTableRow log={row} key={index} />
                          ))}
                        </>
                      )}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
            <TablePagination
              page={logsPage}
              component="div"
              count={logsCount}
              rowsPerPage={logsRowsPerPage}
              onPageChange={handleChangePageLogs}
              rowsPerPageOptions={[10, 20, 30]}
              onRowsPerPageChange={handleChangeRowsPerPageLogs}
            />
          </Card>
        </Grid>
      </Grid>

      <CustomerDrawer
        isOpen={openAddCust}
        handleClose={handleCloseAddCustomer}
        formik={formik}
        isLoading={isLoadingAddCustomer}
        handleSubmit={handleSubmitNewCust}
      />
    </Container>
  );
};

CustomerView.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearchInputChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  customers: PropTypes.array,
  openAddCust: PropTypes.bool.isRequired,
  handleOpenAddCustomer: PropTypes.func.isRequired,
  handleCloseAddCustomer: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  headerLabels: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  isLoadingAddCustomer: PropTypes.bool.isRequired,
  handleSubmitNewCust: PropTypes.func.isRequired,
  handleClickRow: PropTypes.func.isRequired,
};
