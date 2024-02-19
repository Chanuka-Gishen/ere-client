import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import { CurrencyInput } from 'src/components/currency-input/currency-input';
import { DeleteOutlineSharp } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

const CustomCell = ({ children, ...props }) => {
  return (
    <TableCell sx={{ borderBottom: 'none' }} {...props}>
      {children}
    </TableCell>
  );
};

export const ChargersView = ({
  formik,
  handleAddRow,
  handleDeleteCharge,
  isLoading,
  handleSubmit,
  handleResetChargers,
}) => {
  const { values, getFieldProps, errors, touched, handleChange, handleBlur } = formik;
  return (
    <Scrollbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <CustomCell align="center">Item</CustomCell>
              <CustomCell align="center">Description</CustomCell>
              <CustomCell align="center">Qty</CustomCell>
              <CustomCell align="right">Cost</CustomCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.items.map((value, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Stack direction={'row'} spacing={2}>
                    <IconButton onClick={() => handleDeleteCharge(index)}>
                      <DeleteOutlineSharp />
                    </IconButton>
                    <TextField
                      size="small"
                      name={`items[${index}].item`}
                      fullWidth
                      value={values.items[index].item}
                      onChange={(e) => {
                        const { value } = e.target;
                        handleChange(`items[${index}].item`)(e);
                      }}
                      onBlur={handleBlur(`items[${index}].item`)}
                      error={Boolean(
                        touched.items &&
                          touched.items[index] &&
                          touched.items[index].item &&
                          errors.items &&
                          errors.items[index] &&
                          errors.items[index].item
                      )}
                      helperText={
                        (touched.items &&
                          touched.items[index] &&
                          touched.items[index].item &&
                          errors.items &&
                          errors.items[index] &&
                          errors.items[index].item) ||
                        ''
                      }
                    />
                  </Stack>
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    name={`items[${index}].itemDescription`}
                    fullWidth
                    value={values.items[index].itemDescription}
                    onChange={(e) => {
                      const { value } = e.target;
                      handleChange(`items[${index}].itemDescription`)(e);
                    }}
                    onBlur={handleBlur(`items[${index}].itemDescription`)}
                    error={Boolean(
                      touched.items &&
                        touched.items[index] &&
                        touched.items[index].itemDescription &&
                        errors.items &&
                        errors.items[index] &&
                        errors.items[index].itemDescription
                    )}
                    helperText={
                      (touched.items &&
                        touched.items[index] &&
                        touched.items[index].itemDescription &&
                        errors.items &&
                        errors.items[index] &&
                        errors.items[index].itemDescription) ||
                      ''
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    name={`items[${index}].itemQty`}
                    type="number"
                    fullWidth
                    value={values.items[index].itemQty}
                    onChange={(e) => {
                      const { value } = e.target;
                      handleChange(`items[${index}].itemQty`)(e);
                    }}
                    onBlur={handleBlur(`items[${index}].itemQty`)}
                    error={Boolean(
                      touched.items &&
                        touched.items[index] &&
                        touched.items[index].itemQty &&
                        errors.items &&
                        errors.items[index] &&
                        errors.items[index].itemQty
                    )}
                    helperText={
                      (touched.items &&
                        touched.items[index] &&
                        touched.items[index].itemQty &&
                        errors.items &&
                        errors.items[index] &&
                        errors.items[index].itemQty) ||
                      ''
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    name={`items[${index}].itemCost`}
                    fullWidth
                    value={values.items[index].itemCost}
                    onChange={(e) => {
                      const { value } = e.target;
                      handleChange(`items[${index}].itemCost`)(e);
                    }}
                    onBlur={handleBlur(`items[${index}].itemCost`)}
                    error={Boolean(
                      touched.items &&
                        touched.items[index] &&
                        touched.items[index].itemCost &&
                        errors.items &&
                        errors.items[index] &&
                        errors.items[index].itemCost
                    )}
                    helperText={
                      (touched.items &&
                        touched.items[index] &&
                        touched.items[index].itemCost &&
                        errors.items &&
                        errors.items[index] &&
                        errors.items[index].itemCost) ||
                      ''
                    }
                    InputProps={{
                      inputComponent: CurrencyInput,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <CustomCell colSpan={4} align="center">
                <Button onClick={handleAddRow} disabled={isLoading}>
                  Add Item
                </Button>
              </CustomCell>
            </TableRow>
            <TableRow>
              <CustomCell>Labour chargers</CustomCell>
              <CustomCell>
                <TextField
                  size="small"
                  name="labourCharges.description"
                  fullWidth
                  {...getFieldProps('labourCharges.description')} // Using getFieldProps to bind the input
                  error={Boolean(
                    touched.labourCharges &&
                      touched.labourCharges.description &&
                      errors.labourCharges &&
                      errors.labourCharges.description
                  )}
                  helperText={
                    (touched.labourCharges &&
                      touched.labourCharges.description &&
                      errors.labourCharges &&
                      errors.labourCharges.description) ||
                    ''
                  }
                />
              </CustomCell>
              <CustomCell></CustomCell>
              <CustomCell align="right">
                <TextField
                  size="small"
                  name="labourCharges.amount"
                  fullWidth
                  onChange={(e) => {
                    const { value } = e.target;
                    handleChange(`labourCharges.amount`)(e);
                  }}
                  {...getFieldProps('labourCharges.amount')}
                  error={Boolean(
                    touched.labourCharges &&
                      touched.labourCharges.amount &&
                      errors.labourCharges &&
                      errors.labourCharges.amount
                  )}
                  helperText={
                    (touched.labourCharges &&
                      touched.labourCharges.amount &&
                      errors.labourCharges &&
                      errors.labourCharges.amount) ||
                    ''
                  }
                  InputProps={{
                    inputComponent: CurrencyInput,
                  }}
                />
              </CustomCell>
            </TableRow>
            <TableRow>
              <CustomCell>Transport chargers</CustomCell>
              <CustomCell>
                <TextField
                  size="small"
                  name="transportCharges.description"
                  fullWidth
                  {...getFieldProps('transportCharges.description')}
                  error={Boolean(
                    touched.transportCharges &&
                      touched.transportCharges.description &&
                      errors.transportCharges &&
                      errors.transportCharges.description
                  )}
                  helperText={
                    (touched.transportCharges &&
                      touched.transportCharges.description &&
                      errors.transportCharges &&
                      errors.transportCharges.description) ||
                    ''
                  }
                />
              </CustomCell>
              <CustomCell></CustomCell>
              <CustomCell align="right">
                <TextField
                  size="small"
                  name="transportCharges.amount"
                  fullWidth
                  onChange={(e) => {
                    const { value } = e.target;
                    handleChange(`transportCharges.amount`)(e);
                  }}
                  {...getFieldProps('transportCharges.amount')}
                  error={Boolean(
                    touched.transportCharges &&
                      touched.transportCharges.amount &&
                      errors.transportCharges &&
                      errors.transportCharges.amount
                  )}
                  helperText={
                    (touched.transportCharges &&
                      touched.transportCharges.amount &&
                      errors.transportCharges &&
                      errors.transportCharges.amount) ||
                    ''
                  }
                  InputProps={{
                    inputComponent: CurrencyInput,
                  }}
                />
              </CustomCell>
            </TableRow>
            <TableRow>
              <CustomCell>Other chargers</CustomCell>
              <CustomCell>
                <TextField
                  size="small"
                  name="otherCharges.description"
                  fullWidth
                  {...getFieldProps('otherCharges.description')}
                  error={Boolean(
                    touched.otherCharges &&
                      touched.otherCharges.description &&
                      errors.otherCharges &&
                      errors.otherCharges.description
                  )}
                  helperText={
                    (touched.otherCharges &&
                      touched.otherCharges.description &&
                      errors.otherCharges &&
                      errors.otherCharges.description) ||
                    ''
                  }
                />
              </CustomCell>
              <CustomCell></CustomCell>
              <CustomCell align="right">
                <TextField
                  size="small"
                  name="otherCharges.amount"
                  fullWidth
                  onChange={(e) => {
                    const { value } = e.target;
                    handleChange(`otherCharges.amount`)(e);
                  }}
                  {...getFieldProps('otherCharges.amount')}
                  error={Boolean(
                    touched.otherCharges &&
                      touched.otherCharges.amount &&
                      errors.otherCharges &&
                      errors.otherCharges.amount
                  )}
                  helperText={
                    (touched.otherCharges &&
                      touched.otherCharges.amount &&
                      errors.otherCharges &&
                      errors.otherCharges.amount) ||
                    ''
                  }
                  InputProps={{
                    inputComponent: CurrencyInput,
                  }}
                />
              </CustomCell>
            </TableRow>
            <TableRow>
              <CustomCell colSpan={3} align="center">
                Grand total
              </CustomCell>
              <CustomCell align="right">
                <TextField
                  size="small"
                  name="grandTotal"
                  fullWidth
                  disabled={true}
                  value={values.grandTotal}
                  InputProps={{
                    inputComponent: CurrencyInput,
                  }}
                />
              </CustomCell>
            </TableRow>
            <TableRow>
              <CustomCell colSpan={4} align="right">
                <Stack direction="row" spacing={2} justifyContent={'flex-end'}>
                  <Button variant="outlined" onClick={handleResetChargers}>
                    Cancel
                  </Button>
                  <LoadingButton loading={isLoading} onClick={handleSubmit} variant="contained">
                    Submit
                  </LoadingButton>
                </Stack>
              </CustomCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
};

ChargersView.propTypes = {
  formik: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
