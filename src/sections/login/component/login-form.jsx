import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import React from 'react';
import Iconify from 'src/components/iconify';
import PropTypes from 'prop-types';
import { FormikProvider } from 'formik';

const LoginForm = ({ handleClick, handleShowPassword, showPassword, formik, isLoading }) => {
  const { touched, errors, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Stack spacing={3} sx={{ my: 3 }}>
        <TextField
          label="User Name"
          {...getFieldProps('userName')}
          error={Boolean(touched.userName && errors.userName)}
          helperText={touched.userName && errors.userName}
        />

        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...getFieldProps('userPassword')}
          error={Boolean(touched.userPassword && errors.userPassword)}
          helperText={touched.userPassword && errors.userPassword}
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
        onClick={handleClick}
        loading={isLoading}
        disabled={isLoading}
      >
        Login
      </LoadingButton>
    </FormikProvider>
  );
};

LoginForm.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleShowPassword: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
};

export default LoginForm;
