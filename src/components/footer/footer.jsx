import React from 'react';
import { Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <footer
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '2rem',
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h6" gutterBottom sx={{ color: '#333' }}>
          @EREngineers, Sri Lanka
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
