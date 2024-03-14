import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { UserButton } from '@clerk/clerk-react';
import Box from '@mui/material/Box';
import { QuestionProvider } from '@/contexts/QuestionContext';

const Layout = () => (
  <>
    <AppBar sx={{ p: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <IconButton component={Link} to="/" sx={{ color: 'white' }}>
        <HomeIcon fontSize="large" />
      </IconButton>

      <UserButton />
    </AppBar>

    <Box sx={{ mt: 10, p: 4 }}>
      <QuestionProvider>
        <Outlet />
      </QuestionProvider>
    </Box>
  </>
);

export default Layout;
