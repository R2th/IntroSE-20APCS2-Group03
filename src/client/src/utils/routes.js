import Story from "pages/Story";
import Home from "pages/Home";
import Login from "pages/Login";
import NotFoundPageError from "pages/NotFoundPage";
import Postman from "pages/Postman";
import Profile from "pages/Profile";
import Signup from "pages/Signup";
import Trending from "pages/Trending";

import ForgotPassword from "components/ForgotPassword";
import SendMessage from "components/FP_SendMessage";
import SetNewPassword from "components/SetNewPassword";
import ProtectedRoute from "components/ProtectedRoute";

export const AUTH_ROUTES = [
  {
    path: "login",
    errorElement: <NotFoundPageError />,
    element: <Login />,
  },
  {
    path: "signup",
    errorElement: <NotFoundPageError />,
    element: <Signup />,
  },
  {
    path: "forgot_password",
    errorElement: <NotFoundPageError />,
    element: <ForgotPassword />,
  },
  {
    path: "send_messages",
    errorElement: <NotFoundPageError />,
    element: <SendMessage />,
  },
];

export const ROUTES = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "story/:slug",
    element: <Story />,
  },
  {
    path: "story/:slug/edit",
    element: <div>check this</div>,
  },
  {
    path: "trending",
    element: <Trending />,
  },
  {
    path: "set_password",
    element: <SetNewPassword />,
  },
  {
    path: "profile/:id_user",
    element: <Profile />,
  },
  {
    path: "postman",
    element: <Postman />,
  },
  {
    path: "auth",
    children: AUTH_ROUTES,
  },
];
