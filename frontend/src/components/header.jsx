import * as React from 'react';
import {AppBar, Box, Toolbar, Typography, } from '@mui/material';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: '50px' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6" >
            Medical Clinic Patient Admission Information System
          </Typography>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
