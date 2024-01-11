import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import { CustomTableHead } from 'src/components/custom-table/custom-table-head';
import TableLoadingRow from 'src/components/custom-table/table-loading-row';
import TableEmptyRow from 'src/components/custom-table/table-empty-row';
import { AddCustomerJobDialog } from '../components/add-customer-job-dialog';
import { WORK_TYPE } from 'src/constants/common-constants';

// ---------------------------------------

const CustomCell = ({ children, ...props }) => {
  return (
    <TableCell sx={{ borderBottom: 'none' }} {...props}>
      {children}
    </TableCell>
  );
};

export const CustomerWorkView = ({
  headerLabels,
  isLoading,
  workOrders,
  handleRowClick,
  isOpenAddJobDialog,
  handleOpenCloseAddJobDialog,
  formik,
  isLoadingAddJob,
  handleAddJobDialog,
}) => {
  return (
    <>
      <Stack direction={'row'} justifyContent={'flex-end'} sx={{ m: 2 }}>
        <Button variant="contained" onClick={handleOpenCloseAddJobDialog}>
          Add Repair Job
        </Button>
      </Stack>
      <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <CustomTableHead headLabel={headerLabels} enableAction={false} />
            <TableBody>
              {isLoading ? (
                <TableLoadingRow colSpan={headerLabels.length} />
              ) : (
                <>
                  {workOrders.length === 0 ? (
                    <TableEmptyRow colSpan={headerLabels.length} />
                  ) : (
                    <>
                      {workOrders.map((item, index) => (
                        <TableRow hover key={index} onClick={() => handleRowClick(item._id)}>
                          <CustomCell component={'th'}>{item.workOrderCode}</CustomCell>
                          <CustomCell>
                            {new Date(item.workOrderScheduledDate).toLocaleDateString({
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </CustomCell>
                          <CustomCell>
                            <Chip
                              color={
                                item.workOrderType === WORK_TYPE.SERVICE ? 'success' : 'warning'
                              }
                              label={item.workOrderType}
                            />
                          </CustomCell>
                          <CustomCell>{item.workOrderStatus}</CustomCell>
                          <CustomCell>
                            {item.workOrderCompletedDate
                              ? new Date(item.workOrderCompletedDate).toLocaleDateString({
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })
                              : '--'}
                          </CustomCell>
                          <CustomCell>
                            {item.workOrderInvoiceNumber ? item.workOrderInvoiceNumber : '--'}
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
      {isOpenAddJobDialog && (
        <AddCustomerJobDialog
          formik={formik}
          handleClose={handleOpenCloseAddJobDialog}
          isOpen={isOpenAddJobDialog}
          isLoading={isLoadingAddJob}
          handleSubmit={handleAddJobDialog}
        />
      )}
    </>
  );
};

CustomerWorkView.propTypes = {
  headerLabels: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  workOrders: PropTypes.array,
  handleRowClick: PropTypes.func.isRequired,
  isOpenAddJobDialog: PropTypes.bool.isRequired,
  handleOpenCloseAddJobDialog: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  isLoadingAddJob: PropTypes.bool.isRequired,
  handleAddJobDialog: PropTypes.func.isRequired,
};
