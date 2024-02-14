import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';

import { Add } from '@mui/icons-material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomerUnitAddDialog } from '../components/customer-unit-add-dialog';
import EditIcon from '@mui/icons-material/Edit';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import Iconify from 'src/components/iconify';
import commonUtil from 'src/utils/common-util';
import { SelectQrCodeDialog } from 'src/components/select-qr-code';
import { RemoveQrCodeDialog } from 'src/components/remove-qr-code';

const CustomCell = ({ children, ...props }) => {
  return (
    <TableCell sx={{ borderBottom: 'none' }} {...props}>
      {children}
    </TableCell>
  );
};

export const CustomerUnitsComponentView = ({
  open,
  handleOpenMenu,
  handleCloseMenu,
  handleSelectUnit,
  selectedUnit,
  isAdd,
  isLoading,
  units,
  isOpen,
  handleOpenCloseAddDialog,
  formik,
  handleSubmitAddUnit,
  handleInstallationDateChange,
  handleLastMaintainenceDateChange,
  isLoadingAdd,
  isLoadingUpdate,
  formikUpdateUnit,
  handleOpenUpdateDialog,
  handleSubmitUpdateUnit,
  handleFetchCustomerUnits,
  isOpenSelectQr,
  setIsOpenSelectQr,
  handleOpenSelectQrDialog,
  isOpenRemoveQr,
  setIsOpenRemoveQr,
  handleOpenRemoveQrDialog,
}) => {
  return (
    <>
      {isLoading ? (
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
      ) : (
        <Stack direction={'column'} spacing={2}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <CustomCell colSpan={2}>
                    <Stack
                      direction={'row'}
                      spacing={2}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                    >
                      <Typography variant="subtitle1">Units Information</Typography>
                      <Stack direction={'row'} spacing={2}>
                        {selectedUnit && (
                          <>
                            {selectedUnit.unitQrCode ? (
                              <Button variant="contained" onClick={handleOpenRemoveQrDialog}>
                                Remove QR
                              </Button>
                            ) : (
                              <Button variant="contained" onClick={handleOpenSelectQrDialog}>
                                Link QR
                              </Button>
                            )}
                          </>
                        )}

                        <Button
                          variant="contained"
                          startIcon={<Add />}
                          onClick={handleOpenCloseAddDialog}
                        >
                          Add
                        </Button>
                      </Stack>
                    </Stack>
                  </CustomCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {units.length > 0 ? (
            <List sx={{ bgcolor: 'background.paper', maxHeight: 308, overflow: 'auto' }}>
              <>
                {units.map((item, index) => (
                  <Fragment key={index}>
                    <ListItem
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="more-options"
                          onClick={(e) => handleOpenMenu(e, item)}
                        >
                          <Iconify icon="eva:more-vertical-fill" />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar onClick={() => handleSelectUnit(item)}>
                        <Avatar
                          sx={{
                            bgcolor:
                              item._id === selectedUnit?._id ? 'primary.main' : 'defaultColor',
                          }}
                        >
                          <AcUnitIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography>{`${item.unitBrand} - ${item.unitModel} - ${item.unitSerialNo}`}</Typography>
                        }
                        secondary={
                          <Stack direction={'column'}>
                            <Typography
                              variant="body"
                              color={
                                commonUtil.calculateMonthDifference(item.unitNextMaintenanceDate)
                                  ? 'error'
                                  : 'black'
                              }
                            >{`Next maintainance : ${new Date(
                              item.unitNextMaintenanceDate
                            ).toLocaleDateString({
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}`}</Typography>
                            <Typography variant="body">
                              {`Qr Code : ${
                                item.unitQrCode ? item.unitQrCode.qrCodeName : 'not assigned'
                              }`}
                            </Typography>
                          </Stack>
                        }
                      />
                    </ListItem>
                    <Popover
                      open={!!open}
                      anchorEl={open}
                      onClose={handleCloseMenu}
                      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      PaperProps={{
                        sx: { width: 160 },
                      }}
                    >
                      <MenuItem onClick={handleOpenUpdateDialog}>
                        <EditIcon sx={{ mr: 2 }} />
                        Edit
                      </MenuItem>
                      <MenuItem sx={{ color: 'error.main' }}>
                        <DeleteIcon sx={{ mr: 2 }} />
                        Delete
                      </MenuItem>
                    </Popover>
                  </Fragment>
                ))}
              </>
            </List>
          ) : (
            <Stack justifyContent={'center'} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" align="center">
                No Units Found
              </Typography>
            </Stack>
          )}

          {isOpen && (
            <CustomerUnitAddDialog
              isAdd={isAdd}
              isOpen={isOpen}
              handleClose={handleOpenCloseAddDialog}
              formik={isAdd ? formik : formikUpdateUnit}
              handleSubmit={isAdd ? handleSubmitAddUnit : handleSubmitUpdateUnit}
              handleDateChange={handleInstallationDateChange}
              handleLastMaintainenceDateChange={handleLastMaintainenceDateChange}
              isLoading={isAdd ? isLoadingAdd : isLoadingUpdate}
            />
          )}
          {isOpenSelectQr && (
            <SelectQrCodeDialog
              isOpen={isOpenSelectQr}
              setIsOpen={setIsOpenSelectQr}
              unit={selectedUnit}
              handleFetchWorkOrderDetails={handleFetchCustomerUnits}
            />
          )}
          {isOpenRemoveQr && (
            <RemoveQrCodeDialog
              isOpen={isOpenRemoveQr}
              setIsOpen={setIsOpenRemoveQr}
              unit={selectedUnit}
              handleFetchWorkOrderDetails={handleFetchCustomerUnits}
            />
          )}
        </Stack>
      )}
    </>
  );
};

CustomerUnitsComponentView.propTypes = {
  open: PropTypes.object,
  handleOpenMenu: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  handleSelectUnit: PropTypes.func.isRequired,
  selectedUnit: PropTypes.object,
  isAdd: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  units: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
  handleOpenCloseAddDialog: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  handleSubmitAddUnit: PropTypes.func.isRequired,
  handleInstallationDateChange: PropTypes.func.isRequired,
  handleLastMaintainenceDateChange: PropTypes.func.isRequired,
  isLoadingAdd: PropTypes.bool.isRequired,
  isLoadingUpdate: PropTypes.bool.isRequired,
  formikUpdateUnit: PropTypes.object.isRequired,
  handleOpenUpdateDialog: PropTypes.func.isRequired,
  handleSubmitUpdateUnit: PropTypes.func.isRequired,
  handleFetchCustomerUnits: PropTypes.func.isRequired,
  isOpenSelectQr: PropTypes.bool.isRequired,
  setIsOpenSelectQr: PropTypes.bool.isRequired,
  handleOpenSelectQrDialog: PropTypes.func.isRequired,
  isOpenRemoveQr: PropTypes.bool.isRequired,
  setIsOpenRemoveQr: PropTypes.bool.isRequired,
  handleOpenRemoveQrDialog: PropTypes.func.isRequired,
};
