import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { UserButton } from '@clerk/clerk-react';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { QuestionProvider } from '@/contexts/QuestionContext';

const Layout = () => (
  <>
    <AppBar sx={{ p: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <IconButton component={Link} sx={{ color: 'white' }} to="/">
        <HomeIcon fontSize="large" />
      </IconButton>

      <UserButton />
    </AppBar>

    <Box sx={{ mt: 10, p: 4, display: 'flex', flexDirection: 'column' }}>
      <QuestionProvider>
        <Outlet />
      </QuestionProvider>
    </Box>
  </>
);

export default Layout;
