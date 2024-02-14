import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  CircularProgress,
  Container,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { CustomerDetailsUpdateDialog } from '../components/customer-details-update-dialog';

const CustomCell = ({ children, ...props }) => {
  return (
    <TableCell sx={{ borderBottom: 'none' }} {...props}>
      {children}
    </TableCell>
  );
};

export const CustomerDetailsComponentView = ({
  isOpen,
  isLoading,
  customerInfo,
  isLoadingUpdate,
  formik,
  handleOpen,
  handleClose,
  handleUpdateCustomer,
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
        <>
          {customerInfo ? (
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
                        <Typography variant="subtitle1">Customer Information</Typography>
                        <Button variant="contained" startIcon={<Edit />} onClick={handleOpen}>
                          Edit
                        </Button>
                      </Stack>
                    </CustomCell>
                  </TableRow>
                  <TableRow>
                    <CustomCell>Customer Name</CustomCell>
                    <CustomCell>{customerInfo.customerName}</CustomCell>
                  </TableRow>
                  <TableRow>
                    <CustomCell>Address</CustomCell>
                    <CustomCell>{customerInfo.customerAddress}</CustomCell>
                  </TableRow>
                  <TableRow>
                    <CustomCell> Mobile Number</CustomCell>
                    <CustomCell>{customerInfo.customerTel.mobile}</CustomCell>
                  </TableRow>
                  <TableRow>
                    <CustomCell> Landline Number</CustomCell>
                    <CustomCell>
                      {customerInfo.customerTel.landline ? customerInfo.customerTel.landline : '-'}
                    </CustomCell>
                  </TableRow>
                  <TableRow>
                    <CustomCell> Location</CustomCell>
                    <CustomCell>
                      {customerInfo.customerLocation ? (
                        <Link
                          href={customerInfo.customerLocation}
                          underline="hover"
                          target="_blank"
                          rel="noopener"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {customerInfo.customerLocation}
                        </Link>
                      ) : (
                        '-'
                      )}
                    </CustomCell>
                  </TableRow>
                  <TableRow>
                    <CustomCell>Customer Email</CustomCell>
                    <CustomCell>
                      {customerInfo.customerEmail ? customerInfo.customerEmail : '-'}
                    </CustomCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Container
              sx={{
                maxWidth: '100%',
                height: '30vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="title">No Data</Typography>
            </Container>
          )}
        </>
      )}

      {isOpen && (
        <CustomerDetailsUpdateDialog
          isOpen={isOpen}
          handleClose={handleClose}
          isLoading={isLoadingUpdate}
          handleSubmit={handleUpdateCustomer}
          formik={formik}
        />
      )}
    </>
  );
};

CustomerDetailsComponentView.propTypes = {
  customerInfo: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingUpdate: PropTypes.bool.isRequired,
  formik: PropTypes.object.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdateCustomer: PropTypes.func.isRequired,
};
