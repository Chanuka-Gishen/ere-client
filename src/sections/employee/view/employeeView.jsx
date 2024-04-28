import React from 'react';
import {
  Breadcrumbs,
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
  Toolbar,
  Typography,
  emphasize,
  styled,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import Scrollbar from 'src/components/scrollbar';
import { CustomTableHead } from 'src/components/custom-table/custom-table-head';
import TableLoadingRow from 'src/components/custom-table/table-loading-row';
import TableEmptyRow from 'src/components/custom-table/table-empty-row';
import { JobsRow } from '../components/jobsRow';
import { DatePicker } from '@mui/x-date-pickers';
import CancelIcon from '@mui/icons-material/Cancel';

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
  page,
  rowsPerPage,
  documentCount,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Container maxWidth={'xl'}>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
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
            <Stack direction="column" spacing={2}>
              <Typography variant={isLoadingPoints ? 'h6' : 'h3'}>
                {isLoadingPoints ? 'Loading...' : points}
              </Typography>
              <Typography variant="h5">Last Month Points</Typography>
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
                justifyContent: 'space-between',
                p: (theme) => theme.spacing(0, 1, 0, 3),
              }}
            >
              <Stack direction="row" spacing={2}>
                <DatePicker
                  onChange={(date) => handleChangeFilterDate(date)}
                  value={filteredDate}
                />
                <IconButton onClick={() => handleChangeFilterDate(null)} size="large">
                  <CancelIcon />
                </IconButton>
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
    </Container>
  );
};
