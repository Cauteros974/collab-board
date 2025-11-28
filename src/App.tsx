import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner'; 
import { router } from './app/routes';
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

import { useEffect } from 'react';
import { create } from 'zustand';

interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { theme: newTheme };
    }),
}));

export const useTheme = () => {
  const { theme, toggleTheme } = useThemeStore();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return { theme, toggleTheme };
};