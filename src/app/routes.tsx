import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../components/common/Layout/Layout';
import { BoardPage } from '../features/tasks/pages/BoardPage';
import { DashboardPage } from '../features/dashboard/pages/DashboardPage';
import { LoginPage } from '../features/auth/pages/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    
    element: <Layout />, 
    children: [
      // If the user simply visited the site, we redirect them to /board
      { index: true, element: <Navigate to="/board" replace /> },
      
      // The board page itself
      { path: 'board', element: <BoardPage /> },
      
      // Dashboard page
      { path: 'dashboard', element: <DashboardPage /> },
    ],
  },
]);