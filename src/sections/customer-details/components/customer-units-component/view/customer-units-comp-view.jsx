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
import Iconify from 'src/components/iconify';

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
                      <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={handleOpenCloseAddDialog}
                      >
                        Add
                      </Button>
                    </Stack>
                  </CustomCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {units ? (
            <List sx={{ bgcolor: 'background.paper' }}>
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
                        primary={`${item.unitModel} - ${item.unitSerialNo}`}
                        secondary={`Next maintainance : ${new Date(
                          item.unitNextMaintenanceDate
                        ).toLocaleDateString({
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}`}
                      />
                    </ListItem>
                    <Popover
                      open={!!open}
                      anchorEl={open}
                      onClose={handleCloseMenu}
                      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      PaperProps={{
                        sx: { width: 140 },
                      }}
                    >
                      <MenuItem onClick={handleOpenUpdateDialog}>
                        <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                        Edit
                      </MenuItem>

                      <MenuItem sx={{ color: 'error.main' }}>
                        <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                        Delete
                      </MenuItem>
                    </Popover>
                  </Fragment>
                ))}
              </>
            </List>
          ) : (
            <Typography variant="subtitle1">No Units Found</Typography>
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
};
