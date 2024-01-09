import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import { CustomTableHead } from 'src/components/custom-table/custom-table-head';
import TableLoadingRow from 'src/components/custom-table/table-loading-row';
import TableEmptyRow from 'src/components/custom-table/table-empty-row';

// ---------------------------------------

const CustomCell = ({ children, ...props }) => {
  return (
    <TableCell sx={{ borderBottom: 'none' }} {...props}>
      {children}
    </TableCell>
  );
};

export const CustomerWorkView = ({ headerLabels, isLoading, workOrders, handleRowClick }) => {
  return (
    <>
      <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <CustomTableHead headLabel={headerLabels} enableAction={false} />
            <TableBody>
              {isLoading ? (
                <TableRow hover>
                  <TableLoadingRow colSpan={headerLabels.length} />
                </TableRow>
              ) : (
                <>
                  {workOrders.length === 0 ? (
                    <TableRow>
                      <TableEmptyRow colSpan={headerLabels.length} />
                    </TableRow>
                  ) : (
                    <>
                      {workOrders.map((item, index) => (
                        <TableRow hover key={index} onClick={() => handleRowClick(item._id)}>
                          <TableCell component={'th'}>{item.workOrderCode}</TableCell>
                          <TableCell>
                            {new Date(item.workOrderScheduledDate).toLocaleDateString({
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </TableCell>
                          <TableCell>{item.workOrderType}</TableCell>
                          <TableCell>{item.workOrderStatus}</TableCell>
                          <TableCell>
                            {item.workOrderCompletedDate
                              ? new Date(item.workOrderCompletedDate).toLocaleDateString({
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })
                              : '--'}
                          </TableCell>
                          <TableCell>
                            {item.workOrderInvoiceNumber ? item.workOrderInvoiceNumber : '--'}
                          </TableCell>
                          <TableCell></TableCell>
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
    </>
  );
};

CustomerWorkView.propTypes = {
  headerLabels: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  workOrders: PropTypes.array,
  handleRowClick: PropTypes.func.isRequired,
};
