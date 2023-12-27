import React from 'react';

import PropTypes from 'prop-types';

import {
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { CustomerDrawer } from '../component/customer-drawer';
import Scrollbar from 'src/components/scrollbar';
import { CustomTableHead } from 'src/components/custom-table/custom-table-head';
import { USERS } from 'src/_mock/users';
import { CustomerTableRow } from '../component/customer-table-row';
import TableLoadingRow from 'src/components/custom-table/table-loading-row';
import TableEmptyRow from 'src/components/custom-table/table-empty-row';

export const CustomerView = ({
  isLoading,
  customers,
  openAddCust,
  handleOpenAddCustomer,
  handleCloseAddCustomer,
  formik,
  headerLabels,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  isLoadingAddCustomer,
  handleSubmitNewCust,
  handleInstallationDateChange,
}) => {
  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Manage Customers</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenAddCustomer}
        >
          New Customer
        </Button>
      </Stack>

      <Card>
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
                      {customers
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                          <CustomerTableRow customer={row} key={row._id} />
                        ))}
                    </>
                  )}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={USERS.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <CustomerDrawer
        isOpen={openAddCust}
        handleClose={handleCloseAddCustomer}
        formik={formik}
        handleInstallationDateChange={handleInstallationDateChange}
        isLoading={isLoadingAddCustomer}
        handleSubmit={handleSubmitNewCust}
      />
    </Container>
  );
};

CustomerView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  customers: PropTypes.array,
  openAddCust: PropTypes.bool.isRequired,
  handleOpenAddCustomer: PropTypes.func.isRequired,
  handleCloseAddCustomer: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  handleInstallationDateChange: PropTypes.func.isRequired,
  headerLabels: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  isLoadingAddCustomer: PropTypes.bool.isRequired,
  handleSubmitNewCust: PropTypes.func.isRequired,
};
