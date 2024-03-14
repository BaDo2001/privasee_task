import { SignIn, SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { useEffect } from 'react';
import Dashboard from './pages/dashboard';
import CreateQuestion from './pages/createQuestion';
import EditQuestion from './pages/editQuestion';
import Box from '@mui/material/Box';
import Layout from './components/layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
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
    ],
  },
]);

const App = () => {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      return;
    }

    getToken({}).then((token) => {
      if (token) {
        localStorage.setItem('token', token);
      }
    });
  }, [getToken, isSignedIn]);

  return (
    <>
      <SignedOut>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <SignIn />
        </Box>
      </SignedOut>
      <SignedIn>
        <RouterProvider router={router} />
      </SignedIn>
    </>
  );
};

export default App;
