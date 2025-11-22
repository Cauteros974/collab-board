import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/common/Layout";
import { BoardPage } from "../features/tasks/pages/BoardPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div style={{ padding: 20 }}>Welcome to CollabBoard</div>, // Layout stub
    children: [
      {
        path: 'board',
        element: <BoardPage />,
      },
      {
        path: 'chat',
        element: <div>The chat will be here soon</div>,
      },
    ],
  },
]);