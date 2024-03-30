import React from 'react';
import PropTypes from 'prop-types';
import {
  Autocomplete,
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
import { formatCurrency } from 'src/utils/format-number';
import { UNIT_ITEMS } from 'src/constants/unit-item-constants';

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
              <CustomCell align="center" sx={{ width: 250 }}>
                Description
              </CustomCell>
              <CustomCell align="center" sx={{ width: 100 }}>
                Qty
              </CustomCell>
              <CustomCell align="center" sx={{ width: 200 }}>
                Net Price
              </CustomCell>
              <CustomCell align="right" sx={{ width: 200 }}>
                Gross Price
              </CustomCell>
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
                    <Autocomplete
                      id="free-solo-demo"
                      size="small"
                      freeSolo
                      fullWidth
                      options={UNIT_ITEMS.map((option) => option.label)}
                      inputValue={values.items[index].item}
                      onInputChange={(event, newInputValue) => {
                        formik.setFieldValue(`items[${index}].item`, newInputValue); // Synchronize with Formik state
                      }}
                      renderInput={(params) => <TextField {...params} label="Item" />}
                    />
                    {/* <TextField
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
                    /> */}
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
                    name={`items[${index}].itemNetPrice`}
                    fullWidth
                    value={values.items[index].itemNetPrice}
                    onChange={(e) => {
                      const { value } = e.target;
                      handleChange(`items[${index}].itemNetPrice`)(e);
                    }}
                    onBlur={handleBlur(`items[${index}].itemNetPrice`)}
                    error={Boolean(
                      touched.items &&
                        touched.items[index] &&
                        touched.items[index].itemNetPrice &&
                        errors.items &&
                        errors.items[index] &&
                        errors.items[index].itemNetPrice
                    )}
                    helperText={
                      (touched.items &&
                        touched.items[index] &&
                        touched.items[index].itemNetPrice &&
                        errors.items &&
                        errors.items[index] &&
                        errors.items[index].itemNetPrice) ||
                      ''
                    }
                    InputProps={{
                      inputComponent: CurrencyInput,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    name={`items[${index}].itemGrossPrice`}
                    fullWidth
                    value={values.items[index].itemGrossPrice}
                    onChange={(e) => {
                      const { value } = e.target;
                      handleChange(`items[${index}].itemGrossPrice`)(e);
                    }}
                    onBlur={handleBlur(`items[${index}].itemGrossPrice`)}
                    error={Boolean(
                      touched.items &&
                        touched.items[index] &&
                        touched.items[index].itemGrossPrice &&
                        errors.items &&
                        errors.items[index] &&
                        errors.items[index].itemGrossPrice
                    )}
                    helperText={
                      (touched.items &&
                        touched.items[index] &&
                        touched.items[index].itemGrossPrice &&
                        errors.items &&
                        errors.items[index] &&
                        errors.items[index].itemGrossPrice) ||
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
              <CustomCell>Service chargers</CustomCell>
              <CustomCell colSpan={2}>
                <TextField
                  size="small"
                  name="serviceCharges.description"
                  fullWidth
                  {...getFieldProps('serviceCharges.description')} // Using getFieldProps to bind the input
                  error={Boolean(
                    touched.serviceCharges &&
                      touched.serviceCharges.description &&
                      errors.serviceCharges &&
                      errors.serviceCharges.description
                  )}
                  helperText={
                    (touched.serviceCharges &&
                      touched.serviceCharges.description &&
                      errors.serviceCharges &&
                      errors.serviceCharges.description) ||
                    ''
                  }
                />
              </CustomCell>
              <CustomCell>
                <TextField
                  size="small"
                  name="serviceCharges.netAmount"
                  fullWidth
                  onChange={(e) => {
                    const { value } = e.target;
                    handleChange(`serviceCharges.netAmount`)(e);
                  }}
                  {...getFieldProps('serviceCharges.netAmount')}
                  error={Boolean(
                    touched.serviceCharges &&
                      touched.serviceCharges.netAmount &&
                      errors.serviceCharges &&
                      errors.serviceCharges.netAmount
                  )}
                  helperText={
                    (touched.serviceCharges &&
                      touched.serviceCharges.netAmount &&
                      errors.serviceCharges &&
                      errors.serviceCharges.netAmount) ||
                    ''
                  }
                  InputProps={{
                    inputComponent: CurrencyInput,
                  }}
                />
              </CustomCell>
              <CustomCell align="right">
                <TextField
                  size="small"
                  name="serviceCharges.amount"
                  fullWidth
                  onChange={(e) => {
                    const { value } = e.target;
                    handleChange(`serviceCharges.amount`)(e);
                  }}
                  {...getFieldProps('serviceCharges.amount')}
                  error={Boolean(
                    touched.serviceCharges &&
                      touched.serviceCharges.amount &&
                      errors.serviceCharges &&
                      errors.serviceCharges.amount
                  )}
                  helperText={
                    (touched.serviceCharges &&
                      touched.serviceCharges.amount &&
                      errors.serviceCharges &&
                      errors.serviceCharges.amount) ||
                    ''
                  }
                  InputProps={{
                    inputComponent: CurrencyInput,
                  }}
                />
              </CustomCell>
            </TableRow>
            <TableRow>
              <CustomCell>Labour chargers</CustomCell>
              <CustomCell colSpan={2}>
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
              <CustomCell>
                <TextField
                  size="small"
                  name="labourCharges.netAmount"
                  fullWidth
                  onChange={(e) => {
                    const { value } = e.target;
                    handleChange(`labourCharges.netAmount`)(e);
                  }}
                  {...getFieldProps('labourCharges.netAmount')}
                  error={Boolean(
                    touched.labourCharges &&
                      touched.labourCharges.netAmount &&
                      errors.labourCharges &&
                      errors.labourCharges.netAmount
                  )}
                  helperText={
                    (touched.labourCharges &&
                      touched.labourCharges.netAmount &&
                      errors.labourCharges &&
                      errors.labourCharges.netAmount) ||
                    ''
                  }
                  InputProps={{
                    inputComponent: CurrencyInput,
                  }}
                />
              </CustomCell>
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
              <CustomCell colSpan={2}>
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
              <CustomCell>
                <TextField
                  size="small"
                  name="transportCharges.netAmount"
                  fullWidth
                  onChange={(e) => {
                    const { value } = e.target;
                    handleChange(`transportCharges.netAmount`)(e);
                  }}
                  {...getFieldProps('transportCharges.netAmount')}
                  error={Boolean(
                    touched.transportCharges &&
                      touched.transportCharges.netAmount &&
                      errors.transportCharges &&
                      errors.transportCharges.netAmount
                  )}
                  helperText={
                    (touched.transportCharges &&
                      touched.transportCharges.netAmount &&
                      errors.transportCharges &&
                      errors.transportCharges.netAmount) ||
                    ''
                  }
                  InputProps={{
                    inputComponent: CurrencyInput,
                  }}
                />
              </CustomCell>
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
              <CustomCell colSpan={2}>
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
              <CustomCell>
                <TextField
                  size="small"
                  name="otherCharges.netAmount"
                  fullWidth
                  onChange={(e) => {
                    const { value } = e.target;
                    handleChange(`otherCharges.netAmount`)(e);
                  }}
                  {...getFieldProps('otherCharges.netAmount')}
                  error={Boolean(
                    touched.otherCharges &&
                      touched.otherCharges.netAmount &&
                      errors.otherCharges &&
                      errors.otherCharges.netAmount
                  )}
                  helperText={
                    (touched.otherCharges &&
                      touched.otherCharges.netAmount &&
                      errors.otherCharges &&
                      errors.otherCharges.netAmount) ||
                    ''
                  }
                  InputProps={{
                    inputComponent: CurrencyInput,
                  }}
                />
              </CustomCell>
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
              <CustomCell colSpan={4} align="left">
                Discount Percentage
              </CustomCell>
              <CustomCell align="right">
                <TextField
                  size="small"
                  name="discount.percentage"
                  fullWidth
                  onChange={(e) => {
                    const { value } = e.target;
                    handleChange(`discount.percentage`)(e);
                  }}
                  type="number"
                  {...getFieldProps('discount.percentage')}
                  error={Boolean(
                    touched.discount &&
                      touched.discount.percentage &&
                      errors.discount &&
                      errors.discount.percentage
                  )}
                  helperText={
                    (touched.discount &&
                      touched.discount.percentage &&
                      errors.discount &&
                      errors.discount.percentage) ||
                    ''
                  }
                  InputProps={{
                    endAdornment: <InputAdornment position="start">{'%'}</InputAdornment>,
                  }}
                />
              </CustomCell>
            </TableRow>
            <TableRow>
              <CustomCell colSpan={3} align="right">
                Grand total
              </CustomCell>
              <CustomCell align="right">
                <TextField
                  size="small"
                  name="grandNetTotal"
                  fullWidth
                  disabled={true}
                  value={values.grandNetTotal}
                  InputProps={{
                    inputComponent: CurrencyInput,
                  }}
                />
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
              <CustomCell colSpan={3} align="right">
                Total profit
              </CustomCell>
              <CustomCell colSpan={2} align="right">
                <TextField
                  size="small"
                  name="grandTotal"
                  fullWidth
                  disabled={true}
                  value={values.grandTotal - values.grandNetTotal}
                  InputProps={{
                    inputComponent: CurrencyInput,
                  }}
                />
              </CustomCell>
            </TableRow>
            <TableRow>
              <CustomCell colSpan={5} align="right">
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
