import { SignIn, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import Dashboard from './pages/dashboard';
import CreateQuestion from './pages/createQuestion';
import EditQuestion from './pages/editQuestion';
import { QuestionProvider } from './contexts/QuestionContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: 'create',
    element: <CreateQuestion />,
  },
  {
    path: 'edit/:id',
    element: <EditQuestion />,
  },
]);

const App = () => (
  <>
    <SignedOut>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <SignIn />
      </Box>
    </SignedOut>
    <SignedIn>
      <AppBar sx={{ p: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* <Link to="/">Dashboard</Link> */}

        <UserButton />
      </AppBar>

      <Box sx={{ mt: 8, p: 4 }}>
        <QuestionProvider>
          <RouterProvider router={router} />
        </QuestionProvider>
      </Box>
    </SignedIn>
  </>
);

export default App;
