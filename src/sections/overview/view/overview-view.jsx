import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { Card, Table, TableBody, TableContainer, TablePagination, Typography } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import { CustomTableHead } from '../../../components/custom-table/custom-table-head';
import { JOBS } from 'src/_mock/users';
import { JobTableRow } from '../component/job-table-row';

// ----------------------------------------------------------------------

export const Overview = ({
  headLabels,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleClickJob,
}) => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" mb={5}>
        Scheduled Jobs
      </Typography>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <CustomTableHead headLabel={headLabels} />
              <TableBody>
                {JOBS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <JobTableRow jobs={row} key={row._id} handleClickJob={handleClickJob} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={JOBS.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
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
};
