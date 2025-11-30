import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner'; 
import { router } from './app/routes';
import { useTheme } from './hooks/useTheme';
import './app/theme.css';

const App: React.FC = () => {
  useTheme();

  return (
    <React.Fragment>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors closeButton />
    </React.Fragment>
  );
};

export default App;