import { Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
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
          autoComplete="off"
          {...getFieldProps('userName')}
          error={Boolean(touched.userName && errors.userName)}
          helperText={touched.userName && errors.userName}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleClick();
            }
          }}
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleClick();
            }
          }}
        />
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <Button
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
      </Button>
    </FormikProvider>
  );
};

LoginForm.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleShowPassword: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
};

export default LoginForm;
