import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './app';

import './index.css';

const el = document.getElementById('root');

if (!el) {
  throw new Error('Could not find root element');
}

const queryClient = new QueryClient();

const root = createRoot(el);
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>,
);
