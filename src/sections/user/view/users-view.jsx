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
import Scrollbar from 'src/components/scrollbar';
import { CustomTableHead } from 'src/components/custom-table/custom-table-head';
import TableEmptyRow from 'src/components/custom-table/table-empty-row';
import { UsersTableRow } from '../component/users-table-row';
import { AddEmployeeDialog } from '../component/add-employee-dialog';
import TableLoadingRow from 'src/components/custom-table/table-loading-row';
import { UpdateEmployeeDialog } from '../component/update-employee-dialog';
import ConfirmationDialog from 'src/components/confirmation-dialog/confirmation-dialog';

export const UsersView = ({
  isLoadingFetch,
  headerLables,
  employees,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  open,
  handleOpen,
  handleClose,
  formik,
  handleSubmitAddUser,
  isLoadingRegister,
  updateFormik,
  openUpdate,
  handleOpenEmployeeUpdateDialog,
  handleCloseEmployeeUpdateDialog,
  handleUpdateEmployee,
  isLoadingUpdate,
  openDelete,
  handleOpenDeleteDialog,
  handleCloseDeleteDialog,
  handleDeleteEmployee,
  isLoadingDelete,
}) => {
  return (
    <Container maxWidth={'xl'}>
      <Stack direction={'row'} alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Employees</Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          Add
        </Button>
      </Stack>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <CustomTableHead headLabel={headerLables} />
              <TableBody>
                <>
                  {isLoadingFetch ? (
                    <TableLoadingRow colSpan={4} />
                  ) : (
                    <>
                      {employees.length === 0 ? (
                        <TableEmptyRow colSpan={4} />
                      ) : (
                        <>
                          {employees
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                              <UsersTableRow
                                employee={row}
                                key={row._id}
                                handleOpenUpdateDialog={handleOpenEmployeeUpdateDialog}
                                handleOpenDeleteDialog={handleOpenDeleteDialog}
                              />
                            ))}
                        </>
                      )}
                    </>
                  )}
                </>
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      {open && (
        <AddEmployeeDialog
          open={open}
          handleClose={handleClose}
          formik={formik}
          handleSubmitAddUser={handleSubmitAddUser}
          isLoading={isLoadingRegister}
        />
      )}
      {openUpdate && (
        <UpdateEmployeeDialog
          formik={updateFormik}
          handleClose={handleCloseEmployeeUpdateDialog}
          isLoading={isLoadingUpdate}
          open={openUpdate}
          handleSubmit={handleUpdateEmployee}
        />
      )}
      {openDelete && (
        <ConfirmationDialog
          open={openDelete}
          handleClose={handleCloseDeleteDialog}
          isLoading={isLoadingDelete}
          handleSubmit={handleDeleteEmployee}
        />
      )}
    </Container>
  );
};

UsersView.propTypes = {
  isLoadingFetch: PropTypes.bool.isRequired,
  headerLables: PropTypes.array.isRequired,
  employees: PropTypes.array,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  handleSubmitAddUser: PropTypes.func.isRequired,
  isLoadingRegister: PropTypes.bool.isRequired,
  updateFormik: PropTypes.object.isRequired,
  openUpdate: PropTypes.bool.isRequired,
  handleOpenEmployeeUpdateDialog: PropTypes.func.isRequired,
  handleCloseEmployeeUpdateDialog: PropTypes.func.isRequired,
  handleUpdateEmployee: PropTypes.func.isRequired,
  isLoadingUpdate: PropTypes.bool.isRequired,
  openDelete: PropTypes.bool.isRequired,
  handleOpenDeleteDialog: PropTypes.func.isRequired,
  handleCloseDeleteDialog: PropTypes.func.isRequired,
  handleDeleteEmployee: PropTypes.func.isRequired,
  isLoadingDelete: PropTypes.bool.isRequired,
};
