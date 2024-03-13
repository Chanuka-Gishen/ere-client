import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  emphasize,
  styled,
  useMediaQuery,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Add, CloseOutlined, DeleteForeverRounded } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { UNIT_STATUS, WORK_STATUS } from 'src/constants/common-constants';
import TableEmptyRow from 'src/components/custom-table/table-empty-row';
import { ImageUpload } from 'src/components/upload';
import { JobAssignDialog } from '../component/job-assign-dialog';
import commonUtil from 'src/utils/common-util';
import { JobUpdateDialog } from '../component/job-update-dialog';
import { JobCompleteDialog } from '../component/job-complete-dialog';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { AddTipDialog } from '../component/add-tip-dialog';
import { LoadingButton } from '@mui/lab';
import { ChargersView } from '../component/chargers-view';
import { Invoice } from 'src/components/invoice';
import { fDate } from 'src/utils/format-time';
import ConfirmationDialog from 'src/components/confirmation-dialog/confirmation-dialog';

// -----------------------------------------------------------

const GridItem = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

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

const CustomSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const CustomCell = ({ children, ...props }) => {
  return (
    <TableCell sx={{ borderBottom: 'none' }} {...props}>
      {children}
    </TableCell>
  );
};

const LoadingComponent = () => {
  return (
    <Container
      sx={{
        maxWidth: '100%',
        height: '30vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Container>
  );
};

export const JobDetailsView = ({
  jobId,
  isLoading,
  isLoadingPhotoAdd,
  workOrder,
  files,
  setFiles,
  deletedFiles,
  handleSelectDeleteFile,
  handleOnClickBreadCrumb,
  openUploadDialog,
  handleOpenCloseUploadDialog,
  handleUploadImages,
  openAssignDialog,
  employees,
  defaultEmployees,
  handleOpenCloseAssignDialog,
  handleSelectEmployee,
  isLoadingAssign,
  handleAssignEmployees,
  formik,
  isLoadingUpdate,
  openUpdateDialog,
  handleOpenCloseUpdateDialog,
  handleUpadteWorkOrder,
  openCompleteDialog,
  handleOpenCloseCompleteDialog,
  handleFinishJob,
  isLoadingComplete,
  openAddTipDialog,
  handleOpenCloseAddTipDialog,
  totalTip,
  isLoadingAddTip,
  handleChangeTotalTip,
  handleUpdateEmployeeTip,
  isLoadingDeleteFiles,
  handleDeleteFiles,
  chargersFormik,
  handleAddNewChargeRow,
  handleDeleteCharge,
  handleResetChargers,
  isLoadingChargers,
  handleAddUpdateChargers,
  checked,
  handleSwitch,
  openDeleteJobDialog,
  isLoadingDeleteJob,
  handleOpenCloseJobDeleteDialog,
  handleDeleteJob,
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Container maxWidth="xl">
      <Stack direction={'column'} spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb
            onClick={() => handleOnClickBreadCrumb(NAVIGATION_ROUTES.customers)}
            label="Customers"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb
            component="a"
            href={isLoading ? '#' : `/customers/details/${workOrder.workOrderCustomerId._id}`}
            label="Customer-Details"
          />
          <StyledBreadcrumb
            component="a"
            href="#"
            label={`Work-Order-${
              isLoading ? 'Loading...' : workOrder.workOrderCode ? workOrder.workOrderCode : jobId
            }`}
            disabled
          />
        </Breadcrumbs>
        <Grid container spacing={2} sx={{ margin: '10px' }}>
          <Grid item xs={12} md={12}>
            {isLoading ? (
              <GridItem>
                <LoadingComponent />
              </GridItem>
            ) : (
              <GridItem>
                <Stack
                  direction={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  spacing={1}
                >
                  <Typography
                    variant="h6"
                    align="center"
                  >{`${workOrder?.workOrderUnitReference.unitBrand} - ${workOrder?.workOrderUnitReference.unitModel} - ${workOrder?.workOrderUnitReference.unitSerialNo}`}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Installed Date: {fDate(workOrder?.workOrderUnitReference.unitInstalledDate)}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Last Service Date:{' '}
                    {fDate(workOrder?.workOrderUnitReference.unitLastMaintenanceDate)}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Next Service Date:{' '}
                    {fDate(workOrder?.workOrderUnitReference.unitNextMaintenanceDate)}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color={
                      workOrder?.workOrderUnitReference.unitStatus === UNIT_STATUS.ACTIVE
                        ? 'success.main'
                        : 'error'
                    }
                  >
                    Status: {workOrder?.workOrderUnitReference.unitStatus}
                  </Typography>
                </Stack>
              </GridItem>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <GridItem>
              {isLoading ? (
                <LoadingComponent />
              ) : (
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <CustomCell colSpan={2} sx={{ backgroundColor: '#f0f0f0' }}>
                          <Stack
                            spacing={2}
                            justifyContent={'space-between'}
                            direction="row"
                            useFlexGap
                            flexWrap="wrap"
                          >
                            {workOrder && workOrder.workOrderStatus != WORK_STATUS.COMPLETED && (
                              <Button
                                variant="contained"
                                startIcon={<SettingsIcon />}
                                onClick={handleOpenCloseUpdateDialog}
                              >
                                Update
                              </Button>
                            )}
                            {workOrder && workOrder.workOrderStatus === WORK_STATUS.CREATED && (
                              <Button
                                variant="contained"
                                startIcon={<DeleteForeverRounded />}
                                onClick={handleOpenCloseJobDeleteDialog}
                              >
                                Delete Job
                              </Button>
                            )}
                            {workOrder && workOrder.workOrderStatus === WORK_STATUS.SCHEDULED && (
                              <Button
                                variant="contained"
                                startIcon={<ChangeCircleIcon />}
                                onClick={handleOpenCloseCompleteDialog}
                              >
                                Finish Job
                              </Button>
                            )}
                            {workOrder && workOrder.workOrderStatus !== WORK_STATUS.CREATED && (
                              <Button
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                                onClick={handleOpenCloseUploadDialog}
                              >
                                Add Images
                              </Button>
                            )}
                          </Stack>
                        </CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Customer Name</CustomCell>
                        <CustomCell>{workOrder?.workOrderCustomerId.customerName}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Customer Address</CustomCell>
                        <CustomCell>{workOrder?.workOrderCustomerId.customerAddress}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Customer Mobile</CustomCell>
                        <CustomCell>{workOrder?.workOrderCustomerId.customerTel.mobile}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Work Order Code</CustomCell>
                        <CustomCell>{workOrder?.workOrderCode}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Job From</CustomCell>
                        <CustomCell>{workOrder?.workOrderFrom}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Word Order Type</CustomCell>
                        <CustomCell>{workOrder?.workOrderType}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Status</CustomCell>
                        <CustomCell>{workOrder?.workOrderStatus}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>QR Code</CustomCell>
                        <CustomCell>
                          {workOrder?.workOrderUnitReference.unitQrCode
                            ? workOrder?.workOrderUnitReference.unitQrCode.qrCodeName
                            : 'not linked'}
                        </CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Sheduled Date</CustomCell>
                        <CustomCell>{fDate(workOrder?.workOrderScheduledDate)}</CustomCell>
                      </TableRow>
                      {workOrder?.workOrderStatus === WORK_STATUS.COMPLETED && (
                        <>
                          <TableRow>
                            <CustomCell>Completed Date</CustomCell>
                            <CustomCell>{fDate(workOrder?.workOrderCompletedDate)}</CustomCell>
                          </TableRow>
                          <TableRow>
                            <CustomCell>Invoice Number</CustomCell>
                            <CustomCell>
                              {workOrder?.workOrderInvoiceNumber
                                ? workOrder?.workOrderInvoiceNumber
                                : '-'}
                            </CustomCell>
                          </TableRow>
                        </>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </GridItem>
          </Grid>
          <Grid item xs={12} md={5}>
            <GridItem>
              {isLoading ? (
                <LoadingComponent />
              ) : (
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          colSpan={workOrder.workOrderStatus === WORK_STATUS.COMPLETED ? 3 : 2}
                          component={'th'}
                          sx={{ backgroundColor: '#f0f0f0' }}
                        >
                          <Stack
                            direction={'row'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                          >
                            <Typography variant="subtitle1">Assigned Employees</Typography>
                            {workOrder.workOrderStatus !== WORK_STATUS.COMPLETED && (
                              <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={handleOpenCloseAssignDialog}
                              >
                                {workOrder.workOrderAssignedEmployees.length === 0
                                  ? 'Add'
                                  : 'Update'}
                              </Button>
                            )}
                            {workOrder.workOrderStatus === WORK_STATUS.COMPLETED && (
                              <Button
                                variant="contained"
                                startIcon={<CurrencyExchangeIcon />}
                                onClick={handleOpenCloseAddTipDialog}
                              >
                                Add Tip
                              </Button>
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                      {workOrder.workOrderAssignedEmployees.length === 0 ? (
                        <TableEmptyRow colSpan={2} />
                      ) : (
                        <>
                          {workOrder.workOrderAssignedEmployees.map((record, index) => (
                            <TableRow key={index}>
                              <CustomCell>{record.employee.userFullName}</CustomCell>
                              <CustomCell
                                align={
                                  workOrder.workOrderStatus === WORK_STATUS.COMPLETED
                                    ? 'left'
                                    : 'right'
                                }
                              >
                                <Chip
                                  label={record.employee.userRole}
                                  color="primary"
                                  sx={{ width: 100 }}
                                />
                              </CustomCell>
                              {workOrder.workOrderStatus === WORK_STATUS.COMPLETED && (
                                <CustomCell>{`Rs. ${record.tip.amount}`}</CustomCell>
                              )}
                            </TableRow>
                          ))}
                        </>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </GridItem>
          </Grid>

          {!isLoading && workOrder.workOrderImages.length > 0 && (
            <Grid item xs={12} md={12}>
              <GridItem>
                <Stack direction={'column'} spacing={2}>
                  <ImageList cols={isMobile ? 4 : 6} gap={2}>
                    {workOrder.workOrderImages.map((image, index) => (
                      <>
                        {!deletedFiles.includes(image) && (
                          <ImageListItem key={index}>
                            <img
                              //srcSet={image.imageWebUrl}
                              src={commonUtil.getDirectImageLink(image.imageId)}
                              alt={image.imageFileName}
                            />
                            <ImageListItemBar
                              //title={image.imageFileName}
                              subtitle={
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'right',
                                  }}
                                >
                                  <IconButton
                                    size="small"
                                    onClick={() => handleSelectDeleteFile(image)}
                                    sx={{ backgroundColor: 'black' }}
                                  >
                                    <CloseOutlined sx={{ color: 'white' }} />
                                  </IconButton>
                                </Box>
                              }
                              position="top"
                            />
                            <ImageListItemBar
                              //title={image.imageFileName}
                              subtitle={
                                <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                  by: {image.imageUploadedBy.userFullName}
                                </Box>
                              }
                              position="below"
                            />
                          </ImageListItem>
                        )}
                      </>
                    ))}
                  </ImageList>
                  {deletedFiles.length > 0 && (
                    <Grid item xs={12} md={12}>
                      <Box
                        sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                      >
                        <Stack direction={'row'} spacing={2}>
                          <Button
                            onClick={() => handleSelectDeleteFile(null)}
                            disabled={isLoadingDeleteFiles}
                          >
                            Cancel
                          </Button>
                          <LoadingButton
                            onClick={handleDeleteFiles}
                            loading={isLoadingDeleteFiles}
                            disabled={isLoadingDeleteFiles}
                          >
                            Save
                          </LoadingButton>
                        </Stack>
                      </Box>
                    </Grid>
                  )}
                </Stack>
              </GridItem>
            </Grid>
          )}
          {!isLoading && workOrder.workOrderStatus != WORK_STATUS.CREATED && (
            <Grid item xs={12} md={12}>
              <GridItem>
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                  <CustomSwitch
                    checked={checked}
                    onChange={handleSwitch}
                    inputProps={{ 'aria-label': 'controlled' }}
                    defaultChecked
                  />
                  <Typography>{checked ? 'Edit On' : 'Edit Off'}</Typography>
                </Stack>
                {checked ? (
                  <ChargersView
                    formik={chargersFormik}
                    handleAddRow={handleAddNewChargeRow}
                    handleDeleteCharge={handleDeleteCharge}
                    handleResetChargers={handleResetChargers}
                    isLoading={isLoadingChargers}
                    handleSubmit={handleAddUpdateChargers}
                  />
                ) : (
                  <Invoice
                    workOrder={workOrder}
                    unit={workOrder.workOrderUnitReference}
                    customer={workOrder.workOrderCustomerId}
                    invoice={workOrder.workOrderChargers}
                  />
                )}
              </GridItem>
            </Grid>
          )}
        </Grid>
      </Stack>
      {openUploadDialog && (
        <ImageUpload
          isOpen={openUploadDialog}
          isLoading={isLoadingPhotoAdd}
          selectedFiles={files}
          setSelectedFiles={setFiles}
          handleClose={handleOpenCloseUploadDialog}
          handleSubmit={handleUploadImages}
        />
      )}
      {openAssignDialog && (
        <JobAssignDialog
          isOpen={openAssignDialog}
          employees={employees}
          defaultEmployees={defaultEmployees}
          handleClose={handleOpenCloseAssignDialog}
          isLoading={isLoadingAssign}
          handleSubmit={handleAssignEmployees}
          handleSelect={handleSelectEmployee}
        />
      )}
      {openUpdateDialog && (
        <JobUpdateDialog
          formik={formik}
          workOrder={workOrder}
          isOpen={openUpdateDialog}
          handleClose={handleOpenCloseUpdateDialog}
          isLoading={isLoadingUpdate}
          handleSubmit={handleUpadteWorkOrder}
        />
      )}
      {openCompleteDialog && (
        <JobCompleteDialog
          isOpen={openCompleteDialog}
          handleClose={handleOpenCloseCompleteDialog}
          handleSubmit={handleFinishJob}
          isLoading={isLoadingComplete}
        />
      )}
      {openAddTipDialog && (
        <AddTipDialog
          value={totalTip}
          isOpen={openAddTipDialog}
          handleChange={handleChangeTotalTip}
          handleClose={handleOpenCloseAddTipDialog}
          isLoading={isLoadingAddTip}
          handleSubmit={handleUpdateEmployeeTip}
        />
      )}
      {openDeleteJobDialog && (
        <ConfirmationDialog
          open={openDeleteJobDialog}
          handleClose={handleOpenCloseJobDeleteDialog}
          contentText="Are you sure that you want to delete this job ? This cannot be undone."
          handleSubmit={handleDeleteJob}
          isLoading={isLoadingDeleteJob}
        />
      )}
    </Container>
  );
};

JobDetailsView.propTypes = {
  jobId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  workOrder: PropTypes.object,
  files: PropTypes.array,
  setFiles: PropTypes.func.isRequired,
  deletedFiles: PropTypes.array,
  handleSelectDeleteFile: PropTypes.func.isRequired,
  handleOnClickBreadCrumb: PropTypes.func.isRequired,
  openUploadDialog: PropTypes.bool.isRequired,
  handleOpenCloseUploadDialog: PropTypes.func.isRequired,
  handleUploadImages: PropTypes.func.isRequired,
  openAssignDialog: PropTypes.bool.isRequired,
  defaultEmployees: PropTypes.array,
  employees: PropTypes.array.isRequired,
  handleOpenCloseAssignDialog: PropTypes.func.isRequired,
  handleSelectEmployee: PropTypes.func.isRequired,
  isLoadingAssign: PropTypes.bool.isRequired,
  handleAssignEmployees: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  isLoadingUpdate: PropTypes.bool.isRequired,
  openUpdateDialog: PropTypes.bool.isRequired,
  handleOpenCloseUpdateDialog: PropTypes.func.isRequired,
  handleUpadteWorkOrder: PropTypes.func.isRequired,
  openCompleteDialog: PropTypes.bool.isRequired,
  handleOpenCloseCompleteDialog: PropTypes.func.isRequired,
  handleFinishJob: PropTypes.func.isRequired,
  isLoadingComplete: PropTypes.bool.isRequired,
  openAddTipDialog: PropTypes.bool.isRequired,
  handleOpenCloseAddTipDialog: PropTypes.func.isRequired,
  totalTip: PropTypes.number.isRequired,
  isLoadingAddTip: PropTypes.bool.isRequired,
  handleChangeTotalTip: PropTypes.func.isRequired,
  handleUpdateEmployeeTip: PropTypes.func.isRequired,
  isLoadingDeleteFiles: PropTypes.bool.isRequired,
  handleDeleteFiles: PropTypes.func.isRequired,
  chargersFormik: PropTypes.object.isRequired,
  handleDeleteCharge: PropTypes.func.isRequired,
  handleResetChargers: PropTypes.func.isRequired,
  isLoadingChargers: PropTypes.bool.isRequired,
  handleAddUpdateChargers: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  handleSwitch: PropTypes.func.isRequired,
  openDeleteJobDialog: PropTypes.bool.isRequired,
  isLoadingDeleteJob: PropTypes.bool.isRequired,
  handleOpenCloseJobDeleteDialog: PropTypes.func.isRequired,
  handleDeleteJob: PropTypes.func.isRequired,
};
