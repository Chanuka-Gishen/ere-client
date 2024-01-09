import React from 'react';
import PropTypes, { object } from 'prop-types';
import {
  Breadcrumbs,
  Button,
  Card,
  Chip,
  CircularProgress,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
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
import { Add } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { UNIT_STATUS, WORK_STATUS } from 'src/constants/common-constants';
import TableEmptyRow from 'src/components/custom-table/table-empty-row';
import { ImageUpload } from 'src/components/upload';
import { JobAssignDialog } from '../component/job-assign-dialog';
import { grey } from 'src/theme/palette';
import commonUtil from 'src/utils/common-util';
import { JobUpdateDialog } from '../component/job-update-dialog';
import { JobCompleteDialog } from '../component/job-complete-dialog';

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
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Container maxWidth="xl">
      <Stack direction={'column'} spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb
            component="a"
            href="/customers"
            label="Customers"
            icon={<HomeIcon fontSize="small" />}
          />
          {/* <StyledBreadcrumb
            component="a"
            href={`/customers/details/${id}`}
            label="Customer-Details"
          /> */}
          <StyledBreadcrumb
            component="a"
            href="#"
            label={`Work-Order-${
              isLoading ? 'Loading...' : workOrder.workOrderCode ? workOrder.workOrderCode : jobId
            }`}
            disabled
          />
        </Breadcrumbs>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} sx={{ margin: '10px' }}>
            {isLoading ? (
              <GridItem>
                <LoadingComponent />
              </GridItem>
            ) : (
              <GridItem>
                <GridItem>
                  <Stack
                    direction={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    spacing={1}
                  >
                    <Typography variant="h6">{`${workOrder?.workOrderUnitReference.unitModel} - ${workOrder?.workOrderUnitReference.unitSerialNo}`}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Installed Date:{' '}
                      {new Date(
                        workOrder?.workOrderUnitReference.unitInstalledDate
                      ).toLocaleDateString()}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Last Maintenance Date:{' '}
                      {new Date(
                        workOrder?.workOrderUnitReference.unitLastMaintenanceDate
                      ).toLocaleDateString()}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Next Maintenance Date:{' '}
                      {new Date(
                        workOrder?.workOrderUnitReference.unitNextMaintenanceDate
                      ).toLocaleDateString()}
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
              </GridItem>
            )}
          </Grid>
          <Grid item xs={12} md={6} sx={{ margin: '10px' }}>
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
                            <Button
                              variant="contained"
                              startIcon={<SettingsIcon />}
                              onClick={handleOpenCloseUpdateDialog}
                            >
                              Update
                            </Button>
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
                        <CustomCell>Word Order Type</CustomCell>
                        <CustomCell>{workOrder?.workOrderType}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Status</CustomCell>
                        <CustomCell>{workOrder?.workOrderStatus}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Sheduled Date</CustomCell>
                        <CustomCell>
                          {new Date(workOrder?.workOrderScheduledDate).toLocaleDateString({
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </CustomCell>
                      </TableRow>
                      {workOrder?.workOrderStatus === WORK_STATUS.COMPLETED && (
                        <>
                          <TableRow>
                            <CustomCell>Completed Date</CustomCell>
                            <CustomCell>
                              {workOrder?.workOrderCompletedDate
                                ? new Date(workOrder?.workOrderCompletedDate).toLocaleDateString({
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                  })
                                : '-'}
                            </CustomCell>
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
          <Grid item xs={12} md={5} sx={{ margin: '10px' }}>
            <GridItem>
              {isLoading ? (
                <LoadingComponent />
              ) : (
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={2} component={'th'} sx={{ backgroundColor: '#f0f0f0' }}>
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
                          </Stack>
                        </TableCell>
                      </TableRow>
                      {workOrder.workOrderAssignedEmployees.length === 0 ? (
                        <TableEmptyRow colSpan={2} />
                      ) : (
                        <>
                          {workOrder.workOrderAssignedEmployees.map((employee, index) => (
                            <TableRow key={index}>
                              <CustomCell>{employee.userFullName}</CustomCell>
                              <CustomCell align="right">
                                <Chip label={employee.userRole} color="primary" />
                              </CustomCell>
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
                <ImageList cols={isMobile ? 4 : 8} gap={2}>
                  {workOrder.workOrderImages.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        //srcSet={image.imageWebUrl}
                        src={commonUtil.getDirectImageLink(image.imageWebUrl)}
                        alt={image.imageFileName}
                      />
                      <ImageListItemBar
                        //title={image.imageFileName}
                        subtitle={<span>by: {image.imageUploadedBy.userFullName}</span>}
                        position="below"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
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
    </Container>
  );
};

JobDetailsView.propTypes = {
  jobId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  workOrder: PropTypes.object,
  files: PropTypes.array,
  setFiles: PropTypes.func.isRequired,
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
};
