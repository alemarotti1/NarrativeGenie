import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./layout/Main";
import Error from "./pages/Error";
import Root from "./pages/Root";
import Worlds from "./pages/Worlds";
import Description from "./pages/Description";
import Profile from "./pages/Profile";
import Character from "./pages/Character";

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
  {
    path: "/worlds",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/worlds",
        element: <Worlds />,
      },
    ],
  },
  {
    path: "/world",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/world",
        element: <Description />,
      },
    ],
  },
  {
    path: "/profile",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/character",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/character",
        element: <Character />,
      },
    ],
  },
]);

const Router: React.FC = () => <RouterProvider router={router} />;

export default Router;
