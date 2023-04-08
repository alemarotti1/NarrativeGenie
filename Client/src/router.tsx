import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./layout/Main";
import Error from "./pages/Error";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
    ],
  },
]);

const Router: React.FC = () => <RouterProvider router={router} />;

export default Router;
