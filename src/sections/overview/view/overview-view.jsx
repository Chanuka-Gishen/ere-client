import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import {
  Card,
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
import { useSelector } from 'react-redux';
import { USER_ROLE } from 'src/constants/user-role';

// ----------------------------------------------------------------------

export const Overview = ({
  headLabels,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleClickJob,
  jobs,
  isLoading,
}) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Container maxWidth="xl">
      <Stack direction="column" spacing={4}>
        {user.userRole === USER_ROLE.ADMIN && <StatsComponent />}

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
