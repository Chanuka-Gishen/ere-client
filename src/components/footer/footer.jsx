import React from 'react';
import { Container, Grid, Typography } from '@mui/material';

export const Footer = () => {
  const mobileNumbers = [
    'Contact Us',
    '+94 77 387 8080',
    '+94 77 710 2528',
    '+94 71 609 2000',
    '+94 11 264 5675',
  ];

  return (
    <footer
      style={{
        backgroundColor: '#f0f0f0',
        padding: 2,
        textAlign: 'center',
        position: 'relative',
        bottom: 0,
        left: 0,
        width: '100%',
        //zIndex: 1000, // Adjust the z-index as needed
      }}
    >
      <Container>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            {/* Replace 'logo.jpg' with the path to your logo image */}
            <img
              src="/assets/ere-logo.jpg"
              alt="Logo"
              style={{
                maxWidth: 150, // Adjust the size as needed
                marginRight: 2,
              }}
            />
          </Grid>
          <Grid item>
            <Typography variant="body2" component="div">
              {/* Display mobile numbers */}
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {mobileNumbers.map((number, index) => (
                  <li key={index}>{number}</li>
                ))}
              </ul>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};
