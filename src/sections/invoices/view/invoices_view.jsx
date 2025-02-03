import React from 'react';

import {
  Card,
  Chip,
  Container,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CustomTableHead } from 'src/components/custom-table/custom-table-head';
import TableLoadingRow from 'src/components/custom-table/table-loading-row';
import Scrollbar from 'src/components/scrollbar';
import { InvoicesRow } from '../component/invoices-row';
import { DatePicker } from '@mui/x-date-pickers';

import TableEmptyRow from 'src/components/custom-table/table-empty-row';
import { formatCurrency } from 'src/utils/format-number';
import { fDateYearMonthFormat } from 'src/utils/format-time';

export const InvoicesView = ({
  isLoading,
  data,
  header,
  filters,
  handleChangeDate,
  handleChangeFilter,
  handleDeleteFilter,
  handleDeleteFilterTxt,
  page,
  documentCount,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  stats,
  isLoadingStats,
}) => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, sm: 3 }}>
          <Card elevation={2} sx={{ p: 2, backgroundColor: '#090530', color: 'white' }}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h5" align="center">
                Total Net Income
              </Typography>
              <Typography variant={isLoadingStats ? 'h6' : 'h3'} align="center">
                {isLoadingStats ? 'Loading...' : stats ? formatCurrency(stats.NetTotal) : ' - '}
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item size={{ xs: 12, sm: 3 }}>
          <Card elevation={2} sx={{ p: 2, backgroundColor: '#090530', color: 'white' }}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h5" align="center">
                Total Gross Income
              </Typography>
              <Typography variant={isLoadingStats ? 'h6' : 'h3'} align="center">
                {isLoadingStats ? 'Loading...' : stats ? formatCurrency(stats.total) : ' - '}
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item size={{ xs: 12, sm: 3 }}>
          <Card elevation={2} sx={{ p: 2, backgroundColor: '#006307', color: 'white' }}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h5" align="center">
                Total Profit
              </Typography>
              <Typography variant={isLoadingStats ? 'h6' : 'h3'} align="center">
                {isLoadingStats
                  ? 'Loading...'
                  : stats
                    ? formatCurrency(stats.total - stats.NetTotal)
                    : ' - '}
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item size={{ xs: 12, sm: 12 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="h4" fontWeight="bold">
              INVOICES
            </Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                name="filteredMainInvoice"
                label="Main Invoice No"
                type="number"
                variant="outlined"
                value={filters.filteredMainInvoice}
                onChange={handleChangeFilter}
              />
              <TextField
                name="filteredLinkedInvoice"
                label="Linked Invoice No"
                type="number"
                variant="outlined"
                value={filters.filteredLinkedInvoice}
                onChange={handleChangeFilter}
              />
              <DatePicker
                label="Filter Month"
                views={['month', 'year']}
                value={filters.filteredDate}
                onChange={(date) => handleChangeDate(date)}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item size={{ xs: 12, sm: 12 }}>
          <Stack direction="row" spacing={2}>
            {filters.filteredDate && (
              <Chip
                label={`Date - ${fDateYearMonthFormat(filters.filteredDate)}`}
                onDelete={() => handleDeleteFilter('filteredDate')}
              />
            )}
            {filters.filteredMainInvoice && (
              <Chip
                label={`Main Invoice - ${filters.filteredMainInvoice}`}
                onDelete={() => handleDeleteFilterTxt('filteredMainInvoice')}
              />
            )}
            {filters.filteredLinkedInvoice && (
              <Chip
                label={`Linked Invoice - ${filters.filteredLinkedInvoice}`}
                onDelete={() => handleDeleteFilterTxt('filteredLinkedInvoice')}
              />
            )}
          </Stack>
        </Grid>
        <Grid item size={{ xs: 12, sm: 12 }}>
          <Scrollbar>
            <TableContainer>
              <Table>
                <CustomTableHead headLabel={header} enableAction={false} />
                <TableBody>
                  {isLoading ? (
                    <TableLoadingRow colSpan={header.length} />
                  ) : (
                    <>
                      {documentCount > 0 ? (
                        <>
                          {data.map((item, index) => (
                            <InvoicesRow key={index} invoice={item} />
                          ))}
                        </>
                      ) : (
                        <>
                          <TableEmptyRow colSpan={header.length} />
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
        </Grid>
      </Grid>
    </Container>
  );
};
