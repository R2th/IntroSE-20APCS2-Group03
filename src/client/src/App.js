import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Content from "./pages/Content";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import NotFoundPageError from "./pages/NotFoundPage";
import useToken from "./hooks/useAuth";

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
  // const { token, setToken } = useToken();

  // console.log(token);

  // if (!token) {
  //   return <Signup setToken={setToken} />;
  // }

  return <RouterProvider router={router} />;
};

export default App;
