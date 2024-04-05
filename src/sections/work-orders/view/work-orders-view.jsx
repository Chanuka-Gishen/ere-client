import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Chip,
  Container,
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
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  searchParamName,
  searchParamJobCode,
  handleChangeSearchParamName,
  handleChangeSearchParamJobCode,
  filteredData,
}) => {
  const isMobile = useResponsive('down', 'lg');
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" mb={5}>
        Work Orders
      </Typography>

      <Card>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={isMobile ? 0 : 2}>
          <Toolbar
            sx={{
              height: 96,
              display: 'flex',
              justifyContent: 'space-between',
              p: (theme) => theme.spacing(0, 1, 0, 3),
            }}
          >
            <SearchInput
              filterName={searchParamName}
              onFilterName={handleChangeSearchParamName}
              placeholder="Search Customer Name..."
            />
          </Toolbar>
          <Toolbar
            sx={{
              height: 96,
              display: 'flex',
              justifyContent: 'space-between',
              p: (theme) => theme.spacing(0, 1, 0, 3),
            }}
          >
            <SearchInput
              filterName={searchParamJobCode}
              onFilterName={handleChangeSearchParamJobCode}
              placeholder="Search Job Code..."
            />
          </Toolbar>
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
                    {data.length === 0 ? (
                      <TableEmptyRow colSpan={headerLabels.length} />
                    ) : (
                      <>
                        {filteredData
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((item, index) => (
                            <TableRow hover key={index} onClick={() => handleRowClick(item._id)}>
                              <CustomCell component={'th'}>{item.workOrderCode}</CustomCell>
                              <CustomCell>{item.workOrderFrom}</CustomCell>
                              <CustomCell sx={{ width: 200 }}>
                                {item.workOrderCustomerId.customerName}
                              </CustomCell>
                              <CustomCell sx={{ width: 200 }}>
                                {item.workOrderUnitReference.unitSerialNo}
                              </CustomCell>
                              <CustomCell
                                sx={{
                                  color: commonUtil.calculateMonthDifference(
                                    item.workOrderScheduledDate
                                  )
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
                                {item.workOrderInvoice ? item.workOrderInvoice.invoiceNumber : '--'}
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
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10, 20, 30]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};
