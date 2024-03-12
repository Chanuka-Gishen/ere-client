import React from 'react';
import PropTypes from 'prop-types';

import { emphasize, styled } from '@mui/material/styles';
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
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { ImageUpload } from 'src/components/upload';
import commonUtil from 'src/utils/common-util';
import TableEmptyRow from 'src/components/custom-table/table-empty-row';
import { USER_ROLE } from 'src/constants/user-role';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { OverviewUpdateUnit } from '../component/overview-update-unit';
import { SelectQrCodeDialog } from 'src/components/select-qr-code';
import { RemoveQrCodeDialog } from 'src/components/remove-qr-code';
import { WORK_STATUS } from 'src/constants/common-constants';
import { fDate } from 'src/utils/format-time';

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

const GridItem = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

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

const CustomCell = ({ children, ...props }) => {
  return (
    <TableCell sx={{ borderBottom: 'none' }} {...props}>
      {children}
    </TableCell>
  );
};

export const OverviewDetailsView = ({
  onClickBreadCrumb,
  selectedFiles,
  setSelectedFiles,
  isUploaderOpen,
  handleOpenImageUploader,
  handleCloseImageUploader,
  handleUploadImages,
  isUploading,
  isLoading,
  workOrder,
  isLoadingUpdate,
  isUnitUpdateOpen,
  formik,
  handleOpenCloseUnitUpdateDialog,
  handleSubmitUnitUpdate,
  isQrSelectOpen,
  setIsQrSelectOpen,
  isQrRemoveOpen,
  setisQrRemoveOpen,
  handleOpenCloseSelectQrCode,
  handleOpenCloseRemoveQrCode,
  handleFetchWorkOrderDetails,
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Container maxWidth={'xl'}>
      <Stack direction={'column'} spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb
            onClick={() => onClickBreadCrumb(NAVIGATION_ROUTES.dashboard)}
            label="Overview"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb
            component="a"
            href="#"
            label={`Job-Details - ${isLoading ? 'loading...' : workOrder.workOrderCode}`}
            disabled
          />
        </Breadcrumbs>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} style={{ mt: '10px' }}>
            {isLoading ? (
              <LoadingComponent />
            ) : (
              <GridItem>
                <TableContainer>
                  <Table>
                    <TableBody>
                      {workOrder.workOrderStatus != WORK_STATUS.CREATED && (
                        <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                          <CustomCell colSpan={2}>
                            <Button
                              variant="contained"
                              startIcon={<CloudUploadIcon />}
                              onClick={handleOpenImageUploader}
                            >
                              Add Images
                            </Button>
                          </CustomCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <CustomCell>Customer Name</CustomCell>
                        <CustomCell>{workOrder.workOrderCustomerId.customerName}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Mobile Phone Number</CustomCell>
                        <CustomCell>{workOrder.workOrderCustomerId.customerTel.mobile}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell> Land Phone Number</CustomCell>
                        <CustomCell>
                          {workOrder.workOrderCustomerId.customerTel.landline
                            ? workOrder.workOrderCustomerId.customerTel.landline
                            : '-'}
                        </CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Address</CustomCell>
                        <CustomCell>{workOrder.workOrderCustomerId.customerAddress}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell> Location</CustomCell>
                        <CustomCell>
                          {workOrder.workOrderCustomerId.customerLocation ? (
                            <Link
                              href={workOrder.workOrderCustomerId.customerLocation}
                              underline="hover"
                              target="_blank"
                              rel="noopener"
                            >
                              {workOrder.workOrderCustomerId.customerLocation}
                            </Link>
                          ) : (
                            '-'
                          )}
                        </CustomCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </GridItem>
            )}
          </Grid>
          <Grid item xs={12} md={6} style={{ mt: '10px' }}>
            {isLoading ? (
              <LoadingComponent />
            ) : (
              <GridItem>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                        <CustomCell>
                          <Typography variant="subtitle1">Job Details</Typography>
                        </CustomCell>
                        <CustomCell align="right">
                          <Stack
                            direction={'row'}
                            alignItems="center"
                            justifyContent="flex-end"
                            spacing={2}
                          >
                            <Button variant="contained" onClick={handleOpenCloseUnitUpdateDialog}>
                              Edit
                            </Button>
                            {commonUtil.isUndefinedOrNull(
                              workOrder.workOrderUnitReference.unitQrCode
                            ) ? (
                              <Button variant="contained" onClick={handleOpenCloseSelectQrCode}>
                                Link
                              </Button>
                            ) : (
                              <Button variant="contained" onClick={handleOpenCloseRemoveQrCode}>
                                Remove
                              </Button>
                            )}
                          </Stack>
                        </CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>AC Unit</CustomCell>
                        <CustomCell>{`${workOrder.workOrderUnitReference.unitModel} - ${workOrder.workOrderUnitReference.unitSerialNo}`}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>QR Code</CustomCell>
                        <CustomCell>
                          {!commonUtil.isUndefinedOrNull(
                            workOrder.workOrderUnitReference.unitQrCode
                          )
                            ? workOrder.workOrderUnitReference.unitQrCode.qrCodeName
                            : 'not linked'}
                        </CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Work Order Code</CustomCell>
                        <CustomCell>{workOrder.workOrderCode}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Job From</CustomCell>
                        <CustomCell>{workOrder.workOrderFrom}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Sheduled Date</CustomCell>
                        <CustomCell>{fDate(workOrder?.workOrderScheduledDate)}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Word Order Type</CustomCell>
                        <CustomCell>{workOrder.workOrderType}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Status</CustomCell>
                        <CustomCell>{workOrder.workOrderStatus}</CustomCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </GridItem>
            )}
          </Grid>
          <Grid item xs={12} md={6} style={{ mt: '10px' }}>
            {isLoading ? (
              <LoadingComponent />
            ) : (
              <GridItem>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                        <CustomCell colSpan={2}>
                          <Typography variant="subtitle1">Job Assigned To</Typography>
                        </CustomCell>
                      </TableRow>
                      {workOrder.workOrderAssignedEmployees.length === 0 ? (
                        <TableEmptyRow colSpan={2} />
                      ) : (
                        <>
                          {workOrder.workOrderAssignedEmployees.map((record, index) => (
                            <TableRow key={index}>
                              <CustomCell>{record.employee.userFullName}</CustomCell>
                              <CustomCell align={'right'}>
                                <Chip
                                  label={record.employee.userRole}
                                  color={
                                    record.employee.userRole === USER_ROLE.TECHNICIAN
                                      ? 'success'
                                      : 'info'
                                  }
                                />
                              </CustomCell>
                            </TableRow>
                          ))}
                        </>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </GridItem>
            )}
          </Grid>
          {!isLoading && workOrder.workOrderImages.length > 0 && (
            <Grid item xs={12} md={12}>
              <GridItem>
                <ImageList cols={isMobile ? 4 : 8} gap={2}>
                  {workOrder.workOrderImages.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        //srcSet={image.imageWebUrl}
                        src={commonUtil.getDirectImageLink(image.imageId)}
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

        {isUploaderOpen && (
          <ImageUpload
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            isOpen={isUploaderOpen}
            handleClose={handleCloseImageUploader}
            handleSubmit={handleUploadImages}
            isLoading={isUploading}
          />
        )}
        {isUnitUpdateOpen && (
          <OverviewUpdateUnit
            isOpen={isUnitUpdateOpen}
            formik={formik}
            handleClose={handleOpenCloseUnitUpdateDialog}
            isLoading={isLoadingUpdate}
            handleSubmit={handleSubmitUnitUpdate}
          />
        )}
        {isQrSelectOpen && (
          <SelectQrCodeDialog
            isOpen={isQrSelectOpen}
            setIsOpen={setIsQrSelectOpen}
            unit={workOrder.workOrderUnitReference}
            handleFetchWorkOrderDetails={handleFetchWorkOrderDetails}
          />
        )}
        {isQrRemoveOpen && (
          <RemoveQrCodeDialog
            isOpen={isQrRemoveOpen}
            setIsOpen={setisQrRemoveOpen}
            unit={workOrder.workOrderUnitReference}
            handleFetchWorkOrderDetails={handleFetchWorkOrderDetails}
          />
        )}
      </Stack>
    </Container>
  );
};

OverviewDetailsView.propTypes = {
  onClickBreadCrumb: PropTypes.func.isRequired,
  selectedFiles: PropTypes.array.isRequired,
  setSelectedFiles: PropTypes.func.isRequired,
  isUploaderOpen: PropTypes.bool.isRequired,
  handleOpenImageUploader: PropTypes.func.isRequired,
  handleCloseImageUploader: PropTypes.func.isRequired,
  handleUploadImages: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  workOrder: PropTypes.object,
  isLoadingUpdate: PropTypes.bool.isRequired,
  isUnitUpdateOpen: PropTypes.bool.isRequired,
  formik: PropTypes.object.isRequired,
  handleOpenCloseUnitUpdateDialog: PropTypes.func.isRequired,
  handleSubmitUnitUpdate: PropTypes.func.isRequired,
  isQrSelectOpen: PropTypes.bool.isRequired,
  isQrRemoveOpen: PropTypes.bool.isRequired,
  setisQrRemoveOpen: PropTypes.func.isRequired,
  handleOpenCloseSelectQrCode: PropTypes.func.isRequired,
  handleOpenCloseRemoveQrCode: PropTypes.func.isRequired,
  handleFetchWorkOrderDetails: PropTypes.func.isRequired,
};
