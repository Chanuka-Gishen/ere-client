import React from 'react';
import PropTypes from 'prop-types';

import { emphasize, styled } from '@mui/material/styles';
import {
  Breadcrumbs,
  Button,
  Card,
  Chip,
  CircularProgress,
  Collapse,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  List,
  ListItem,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { ImageUpload } from 'src/components/upload';
import { account } from 'src/_mock/account';
import { Edit } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import commonUtil from 'src/utils/common-util';
import TableEmptyRow from 'src/components/custom-table/table-empty-row';
import { USER_ROLE } from 'src/constants/user-role';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { OverviewUpdateUnit } from '../component/overview-update-unit';

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
                        <CustomCell colSpan={3}>
                          <Typography variant="subtitle1">Job Details</Typography>
                        </CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>AC Unit</CustomCell>
                        <CustomCell>{`${workOrder.workOrderUnitReference.unitModel} - ${workOrder.workOrderUnitReference.unitSerialNo}`}</CustomCell>
                        <CustomCell align={'right'}>
                          <Button variant="contained" onClick={handleOpenCloseUnitUpdateDialog}>
                            Edit
                          </Button>
                        </CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Work Order Code</CustomCell>
                        <CustomCell>{workOrder.workOrderCode}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Word Order Type</CustomCell>
                        <CustomCell>{workOrder.workOrderType}</CustomCell>
                      </TableRow>
                      <TableRow>
                        <CustomCell>Status</CustomCell>
                        <CustomCell>{workOrder.workOrderStatus}</CustomCell>
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
                          {workOrder.workOrderAssignedEmployees.map((employee, index) => (
                            <TableRow key={index}>
                              <CustomCell>{employee.userFullName}</CustomCell>
                              <CustomCell align={'right'}>
                                <Chip
                                  label={employee.userRole}
                                  color={
                                    employee.userRole === USER_ROLE.TECHNICIAN ? 'success' : 'info'
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
};
