import React from 'react';

import PropTypes from 'prop-types';
import { FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';

import { PasswordField } from 'src/components/password-field/password-field';

export const SetPasswordForm = ({ formik, isLoading, handleSubmit }) => {
  const { touched, errors, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Stack spacing={3} sx={{ my: 3 }}>
        <PasswordField
          label="Password"
          {...getFieldProps('userPassword')}
          error={Boolean(touched.userPassword && errors.userPassword)}
          helperText={touched.userPassword && errors.userPassword}
        />

        <PasswordField
          label="Confirm Password"
          {...getFieldProps('userConfirmPassword')}
          error={Boolean(touched.userConfirmPassword && errors.userConfirmPassword)}
          helperText={touched.userConfirmPassword && errors.userConfirmPassword}
        />
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
      >
        Login
      </LoadingButton>
    </FormikProvider>
  );
};

SetPasswordForm.propTypes = {
  formik: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SetPasswordForm;
