import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { IconButton, InputAdornment, TextField } from '@mui/material';

import Iconify from 'src/components/iconify';

export const PasswordField = ({ label, error, helperText, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      label={label}
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
      {...props}
      error={error}
      helperText={helperText}
    />
  );
};

PasswordField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.any.isRequired,
};
