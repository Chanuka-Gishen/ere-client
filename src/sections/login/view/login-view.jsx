import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

import { bgGradient } from 'src/theme/css';

import LoginForm from '../component/login-form';

// ----------------------------------------------------------------------

export const LoginView = ({ handleLogin, formik, isLoading }) => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      {/* <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      /> */}

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" textAlign={'center'} sx={{ mb: 5 }}>
            Sign in to EREngineers
          </Typography>

          <LoginForm
            formik={formik}
            handleClick={handleLogin}
            handleShowPassword={handleShowPassword}
            showPassword={showPassword}
            isLoading={isLoading}
          />
        </Card>
      </Stack>
    </Box>
  );
};

LoginView.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  formik: PropTypes.object.isRequired,
};
