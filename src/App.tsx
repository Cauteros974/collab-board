import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";
import { useTheme } from "./hooks/useTheme";
import './app/theme.css';

const App: React.FC = () => {
  useTheme();

  return(
    <RouterProvider router={router} />
  )
}