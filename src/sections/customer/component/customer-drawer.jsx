import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Divider,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';

export const CustomerDrawer = ({ isOpen, handleClose, formik, isLoading, handleSubmit }) => {
  const { touched, errors, getFieldProps } = formik;

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      PaperProps={{
        sx: { width: 380, border: 'none', overflow: 'hidden' },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1, py: 2 }}
      >
        <Typography variant="h6">Enter details</Typography>
        <IconButton onClick={handleClose}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </Stack>

      <Divider />

      <Scrollbar>
        <FormikProvider value={formik}>
          <Stack direction={'column'} spacing={1} sx={{ px: 1, py: 2 }}>
            <TextField
              label="Customer Name*"
              name="customerName"
              fullWidth
              {...getFieldProps('customerName')}
              error={Boolean(touched.customerName && errors.customerName)}
              helperText={touched.customerName && errors.customerName}
            />
            <TextField
              label="Customer Address*"
              name="customerAddress"
              fullWidth
              {...getFieldProps('customerAddress')}
              error={Boolean(touched.customerAddress && errors.customerAddress)}
              helperText={touched.customerAddress && errors.customerAddress}
            />
            <TextField
              label="Customer Mobile*"
              name="customerMobile"
              type="number"
              fullWidth
              {...getFieldProps('customerMobile')}
              error={Boolean(touched.customerMobile && errors.customerMobile)}
              helperText={touched.customerMobile && errors.customerMobile}
            />
            <TextField
              label="Customer Land Line"
              name="customerLand"
              type="number"
              fullWidth
              {...getFieldProps('customerLand')}
            />
            <TextField
              label="Customer Email"
              name="customerEmail"
              fullWidth
              {...getFieldProps('customerEmail')}
            />
          </Stack>
        </FormikProvider>
      </Scrollbar>

      <Card>
        <Stack direction="row" spacing={1} sx={{ p: 3 }}>
          <Button variant="contained" fullWidth color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            loading={isLoading}
            disabled={isLoading}
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            color="primary"
          >
            Submit
          </LoadingButton>
        </Stack>
      </Card>
      {/* <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Clear All
          </Button>
        </Box> */}
    </Drawer>
  );
};

CustomerDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
