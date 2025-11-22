import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/common/Layout/Layout";
import { BoardPage } from "../features/tasks/pages/BoardPage";

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <div style={{ padding: 20 }}>Welcome to CollabBoard</div>,
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
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);