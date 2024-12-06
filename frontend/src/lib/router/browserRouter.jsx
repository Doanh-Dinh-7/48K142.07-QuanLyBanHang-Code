import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../../pages/Error";
import LoginPage from "../../pages/Login";
import HomePage from "../../pages/Home";
import ManagerPage from "../../pages/Manager";
import StaticsPage from "../../pages/Statics";
import Layout from "../../lib/components/Layout"; // Import Layout chứa Header

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Dùng Layout cho HomePage và các route con
    //errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/manager",
        element: <ManagerPage />,
      },
      {
        path: "/statics",
        element: <StaticsPage />,
      },
    ],
  },
  {
    path: "/login", // LoginPage không có Header
    element: <LoginPage />,
  },
]);
