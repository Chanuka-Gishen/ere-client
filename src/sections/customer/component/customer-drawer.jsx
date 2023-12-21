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
import { FieldArray, FormikProvider } from 'formik';
import { DatePicker } from '@mui/x-date-pickers';

export const CustomerDrawer = ({ isOpen, handleClose, formik }) => {
  const { values, touched, errors, getFieldProps } = formik;

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
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
              label="Customer Name"
              name="customerFullName"
              fullWidth
              {...getFieldProps('customerFullName')}
              error={Boolean(touched.customerFullName && errors.customerFullName)}
              helperText={touched.customerFullName && errors.customerFullName}
            />
            <TextField
              label="Customer Address"
              name="customerAddress"
              fullWidth
              {...getFieldProps('customerAddress')}
              error={Boolean(touched.customerAddress && errors.customerAddress)}
              helperText={touched.customerAddress && errors.customerAddress}
            />
            <TextField
              label="Customer Mobile"
              name="customerMobile"
              fullWidth
              {...getFieldProps('customerMobile')}
              error={Boolean(touched.customerMobile && errors.customerMobile)}
              helperText={touched.customerMobile && errors.customerMobile}
            />
            <TextField
              label="Customer Email"
              name="customerEmail"
              fullWidth
              {...getFieldProps('customerEmail')}
            />
            <Divider />
            <Typography variant="subtitle2">AC Units</Typography>
            <FieldArray name="customerUnits">
              {({ push, remove }) => (
                <div>
                  {values.customerUnits.map((unit, index) => (
                    <Stack key={index} spacing={1} direction={'column'}>
                      <TextField
                        label="Unit Brand"
                        name={`customerUnits[${index}].unitBrand`}
                        {...getFieldProps(`customerUnits[${index}].unitBrand`)}
                        error={!!unit.unitBrand}
                        helperText={unit.unitBrand}
                      />
                      <TextField
                        label="Unit Model"
                        name={`customerUnits[${index}].unitModel`}
                        {...getFieldProps(`customerUnits[${index}].unitModel`)}
                        error={!!unit.unitModel}
                        helperText={unit.unitModel}
                      />
                      <Stack direction={'row'} spacing={1}>
                        <DatePicker label="Installation Date" />
                        <DatePicker label="Next Maintenance Date" />
                      </Stack>

                      <Button type="button" onClick={() => remove(index)}>
                        Remove Unit
                      </Button>
                    </Stack>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      push({
                        unitBrand: '',
                        unitModel: '',
                        unitInstallationDate: null,
                        unitNextMaintenanceDate: null,
                      })
                    }
                  >
                    Add Unit
                  </Button>
                </div>
              )}
            </FieldArray>
          </Stack>
        </FormikProvider>
      </Scrollbar>

      <Card>
        <Stack direction="row" spacing={1} sx={{ p: 3 }}>
          <Button variant="contained" fullWidth color="inherit">
            Cancel
          </Button>
          <Button variant="contained" fullWidth color="primary">
            Submit
          </Button>
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
};
