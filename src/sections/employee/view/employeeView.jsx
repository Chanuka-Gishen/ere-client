import React from 'react';
import {
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Container,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TextField,
  Toolbar,
  Typography,
  emphasize,
  styled,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import Scrollbar from 'src/components/scrollbar';
import { CustomTableHead } from 'src/components/custom-table/custom-table-head';
import TableLoadingRow from 'src/components/custom-table/table-loading-row';
import TableEmptyRow from 'src/components/custom-table/table-empty-row';
import { JobsRow } from '../components/jobsRow';
import { fDate } from 'src/utils/format-time';
import { SelectDateRange } from 'src/components/selectDateRange';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export const EmployeeView = ({
  handleOnClickBreadCrumb,
  headers,
  points,
  totalPoints,
  isLoadingTotalPoints,
  isLoadingPoints,
  jobs,
  isLoading,
  filteredDate,
  handleChangeFilterDate,
  currentPoints,
  isLoadingCurrentPoints,
  formikDateRange,
  openFilter,
  handleOpenSelectDateRange,
  handleCloseSelectDateRange,
  handleSubmitFilterDate,
  page,
  rowsPerPage,
  documentCount,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  // Get the start date of last month
  const lastMonthStartDate = new Date();
  lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() - 1);
  lastMonthStartDate.setDate(2);
  lastMonthStartDate.setHours(0, 0, 0, 0);

  // Get the end date of last month
  const lastMonthEndDate = new Date();
  lastMonthEndDate.setDate(2); // Set to last day of previous month
  lastMonthEndDate.setHours(23, 59, 59, 999);

  // Current month start Date
  const startdate = new Date();
  startdate.setDate(2);
  startdate.setHours(0, 0, 0, 0);

  return (
    <Container maxWidth={'xl'}>
      <Grid container spacing={{ xs: 1, sm: 4 }}>
        <Grid item xs={12} sm={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              onClick={() => handleOnClickBreadCrumb(NAVIGATION_ROUTES.employees.base)}
              label="Employees"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" disabled label="Name" />
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h4">Employee Details</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card elevation={2} sx={{ p: 2, backgroundColor: '#090530', color: 'white' }}>
            <Stack direction="column" spacing={1}>
              <Typography variant={isLoadingPoints ? 'h6' : 'h3'}>
                {isLoadingPoints ? 'Loading...' : points}
              </Typography>
              <Typography variant="h5">Last Month Points</Typography>
              <Typography>{`${fDate(lastMonthStartDate)} - ${fDate(lastMonthEndDate)}`}</Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card elevation={2} sx={{ p: 2, backgroundColor: '#090530', color: 'white' }}>
            <Stack direction="column" spacing={1}>
              <Typography variant={isLoadingPoints ? 'h6' : 'h3'}>
                {isLoadingCurrentPoints ? 'Loading...' : currentPoints}
              </Typography>
              <Typography variant="h5">Current Month Points</Typography>
              <Typography>{`${fDate(startdate)} - ${fDate(new Date())}`}</Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card elevation={2} sx={{ p: 2, backgroundColor: '#090530', color: 'white' }}>
            <Stack direction="column" spacing={2}>
              <Typography variant={isLoadingTotalPoints ? 'h6' : 'h3'}>
                {isLoadingTotalPoints ? 'Loading...' : totalPoints}
              </Typography>
              <Typography variant="h5">Total Points</Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Card>
            <Toolbar
              sx={{
                height: 96,
                display: 'flex',
                justifyContent: 'flex-end',
                p: (theme) => theme.spacing(0, 1, 0, 3),
              }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2 }}
                alignItems="center"
              >
                <TextField
                  variant="outlined"
                  name="filterDate"
                  label="Date Range"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  value={`${fDate(formikDateRange.values.dateFrom)}  -  ${fDate(
                    formikDateRange.values.dateTo
                  )}`}
                />

                <Button
                  startIcon={<FilterAltIcon />}
                  variant="contained"
                  onClick={handleOpenSelectDateRange}
                >
                  Filter
                </Button>
              </Stack>
            </Toolbar>
            <Scrollbar>
              <TableContainer sx={{ overflow: 'unset' }}>
                <Table sx={{ minWidth: 800 }}>
                  <CustomTableHead headLabel={headers} enableAction={false} />
                  <TableBody>
                    {isLoading ? (
                      <TableLoadingRow colSpan={headers.length} />
                    ) : (
                      <>
                        {jobs.length > 0 ? (
                          <>
                            {jobs.map((job, index) => (
                              <JobsRow item={job} key={index} />
                            ))}
                          </>
                        ) : (
                          <TableEmptyRow colSpan={headers} />
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
        </Grid>
      </Grid>
      {openFilter && (
        <SelectDateRange
          open={openFilter}
          formik={formikDateRange}
          handleClose={handleCloseSelectDateRange}
          handleSubmit={handleSubmitFilterDate}
          isLoading={isLoading}
        />
      )}
    </Container>
  );
};
