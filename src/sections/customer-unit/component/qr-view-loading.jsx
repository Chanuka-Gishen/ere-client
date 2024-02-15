import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';

export const QrViewLoading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Stack direction={'column'} spacing={2} justifyContent={'center'} alignItems={'center'}>
        <CircularProgress />
        <Typography variant="h4" align="center">
          Loading ...
        </Typography>
      </Stack>
    </Box>
  );
};
