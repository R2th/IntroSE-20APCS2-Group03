import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Content from "./pages/Content";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import NotFoundPageError from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPageError />,
  },
  {
    path: "/content/:id_content",
    element: <Content />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile/:id_user",
    element: <Profile />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
