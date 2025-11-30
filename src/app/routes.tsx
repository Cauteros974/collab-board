import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../components/common/Layout/Layout';
import { BoardPage } from '../features/tasks/pages/BoardPage';
import { DashboardPage } from '../features/dashboard/pages/DashboardPage';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { ChatPage } from '../features/chat/pages/ChatPage';
import { useAuthStore } from '../features/auth/store';

//Component for protection routes
const ProtectedRoute = ({ children }: {children: React.ReactNode}) => {
  const user = useAuthStore((state) => state.user);

  if(!user) {
    return <Navigate to = "/login" replace />;
  }

  return<>{children}</>
};

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

      {path: 'chat', element: <ChatPage />}
    ],
  },
]);