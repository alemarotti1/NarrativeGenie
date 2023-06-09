import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./layout/Main";
import Error from "./pages/Error";
import Root from "./pages/Root";
import Worlds from "./pages/Worlds";
import Description from "./pages/Description";
import Profile from "./pages/Profile";
import Character from "./pages/Character";
import Place from "./pages/Place";
import ObjectPage from "./pages/Object";

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
      {
        path: "/worlds",
        element: <Worlds />,
      },
      {
        path: "/worlds/:id",
        element: <Description />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/characters/:id",
        element: <Character />,
      },
      {
        path: "/places/:id",
        element: <Place />,
      },
      {
        path: "/objects/:id",
        element: <ObjectPage />,
      },
    ],
  },
  
]);

const Router: React.FC = () => <RouterProvider router={router} />;

export default Router;
