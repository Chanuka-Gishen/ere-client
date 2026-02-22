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
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

import { CustomerLogsTableRow } from '../components/customer-logs-table-row';
import TableEmptyRow from 'src/components/custom-table/table-empty-row';
import TableLoadingRow from 'src/components/custom-table/table-loading-row';
import Scrollbar from 'src/components/scrollbar';
import { CustomTableHead } from 'src/components/custom-table/custom-table-head';
import SendRemainderDialog from '../components/send-remainder-dialog';
import { fDate, getDaysDifference } from 'src/utils/format-time';

export const CustomerLogsView = ({
  headerLabels,
  logs,
  logsCount,
  page,
  rowsPerPage,
  message,
  isOpen,
  isLoading,
  isLoadingCreate,
  handleChangePage,
  handleChangeRowsPerPage,
  handleToggleSendRemainder,
  handleAddLog,
}) => {
  return (
    <Card>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Reminders</Typography>
          <Button
            variant="outlined"
            startIcon={<CircleNotificationsIcon />}
            onClick={handleToggleSendRemainder}
            disabled={isLoadingCreate}
          >
            Notify
          </Button>
        </Stack>

        <Typography variant="caption">
          Last Notified On : {logs.length > 0 ? fDate(logs[0].createdAt) : ' - '}
          {` [${logs.length > 0 ? getDaysDifference(logs[0].createdAt) : ' - '} Days ago]`}
        </Typography>
      </Container>
      <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table>
            <CustomTableHead headLabel={headerLabels} enableAction={false} />
            {isLoading ? (
              <TableBody>
                <TableLoadingRow colSpan={headerLabels.length} />
              </TableBody>
            ) : (
              <TableBody>
                {logs.length === 0 ? (
                  <TableEmptyRow colSpan={headerLabels.length} />
                ) : (
                  <>
                    {logs.map((row, index) => (
                      <CustomerLogsTableRow log={row} key={index} />
                    ))}
                  </>
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>
      <TablePagination
        page={page}
        component="div"
        count={logsCount}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 15]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {isOpen && (
        <SendRemainderDialog
          open={isOpen}
          message={message}
          isLoading={isLoadingCreate}
          onClose={handleToggleSendRemainder}
          onSubmit={handleAddLog}
        />
      )}
    </Card>
  );
};
