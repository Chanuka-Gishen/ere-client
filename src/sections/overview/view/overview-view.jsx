import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import {
  Card,
  Grid,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import { CustomTableHead } from '../../../components/custom-table/custom-table-head';
import { JobTableRow } from '../component/job-table-row';
import TableLoadingRow from 'src/components/custom-table/table-loading-row';
import TableEmptyRow from 'src/components/custom-table/table-empty-row';
import { StatsComponent } from '../component/stats-component';
import { USER_ROLE } from 'src/constants/user-role';
import { Calender } from 'src/components/calender';
import { UpcomingJobsRow } from '../component/upcoming-jobs-row';
import useAuthStore from 'src/store/auth-store';

// ----------------------------------------------------------------------

export const Overview = ({
  headLabels,
  headerLabelsUJ,
  page,
  rowsPerPage,
  pageUJ,
  rowsPerPageUJ,
  countPJ,
  handleChangePage,
  handleChangeRowsPerPage,
  handleClickJob,
  jobs,
  jobsUJ,
  isLoading,
  isLoadingUJ,
  handleChangePageUJ,
  handleChangeRowsPerPageUJ,
  handleClickUpcomingCustomer,
}) => {
  const { auth } = useAuthStore.getState();
  const user = auth.user;

  return (
    <Container maxWidth="xl">
      <Grid container rowGap={4} columnSpacing={2}>
        {user.userRole === USER_ROLE.ADMIN && (
          <Grid size={12}>
            <Stack direction="column" spacing={4}>
              <StatsComponent />
              <Calender />
            </Stack>
          </Grid>
        )}
        <Grid size={{ lg: 8, md: 8, sm: 12 }}>
          <Stack direction="column" spacing={4}>
            <Typography variant="h4" mb={5}>
              Scheduled Jobs
            </Typography>
            <Card>
              <Scrollbar>
                <TableContainer sx={{ overflow: 'unset' }}>
                  <Table sx={{ minWidth: 800 }}>
                    <CustomTableHead headLabel={headLabels} enableAction={false} />
                    <TableBody>
                      {isLoading ? (
                        <TableLoadingRow colSpan={headLabels.length} />
                      ) : (
                        <>
                          {jobs.length === 0 ? (
                            <TableEmptyRow colSpan={headLabels.length} />
                          ) : (
                            <>
                              {jobs
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                  <JobTableRow
                                    jobs={row}
                                    key={row._id}
                                    handleClickJob={handleClickJob}
                                  />
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
                count={jobs.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Stack>
        </Grid>
        <Grid size={{ lg: 4, md: 4, sm: 12 }}>
          <Stack direction="column" rowGap={4}>
            <Typography variant="h4">Upcoming Maintainences</Typography>
            <Card>
              <Scrollbar>
                <TableContainer sx={{ overflow: 'unset' }}>
                  <Table sx={{ minWidth: '100%' }}>
                    <CustomTableHead headLabel={headerLabelsUJ} enableAction={false} />
                    <TableBody>
                      {isLoadingUJ ? (
                        <TableLoadingRow colSpan={headerLabelsUJ.length} />
                      ) : (
                        <>
                          {jobsUJ.length === 0 ? (
                            <TableEmptyRow colSpan={headerLabelsUJ.length} />
                          ) : (
                            <>
                              {jobsUJ.map((row, index) => (
                                <UpcomingJobsRow
                                  jobs={row}
                                  key={index}
                                  onRowClick={handleClickUpcomingCustomer}
                                />
                              ))}
                            </>
                          )}
                        </>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
              {countPJ > 5 && (
                <TablePagination
                  page={pageUJ}
                  component="div"
                  count={countPJ}
                  rowsPerPage={rowsPerPageUJ}
                  onPageChange={handleChangePageUJ}
                  rowsPerPageOptions={[5, 10, 25]}
                  onRowsPerPageChange={handleChangeRowsPerPageUJ}
                />
              )}
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

Overview.propTypes = {
  headLabels: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleClickJob: PropTypes.func.isRequired,
  jobs: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
};
