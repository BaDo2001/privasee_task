import { SignIn, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import React from 'react';

function App(): JSX.Element {
  return (
    <>
      <SignedOut>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <SignIn />
        </Box>
      </SignedOut>
      <SignedIn>
        <AppBar sx={{ p: 2, alignItems: 'flex-end' }}>
          <UserButton />
        </AppBar>
      </SignedIn>
    </>
  );
}

export default App;
