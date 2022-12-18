import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "components/Navbar";
import ForgotPassword from "./components/ForgotPassword";
import SendMessage from "./components/FP_SendMessage";
import SetNewPassword from "components/SetNewPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/Auth/authContext";
import { StylesProvider } from "./contexts/Styles/stylesContext";
import Story from "./pages/Story";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFoundPageError from "./pages/NotFoundPage";
import Postman from "./pages/Postman";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Trending from "./pages/Trending";

const ROUTER = [
  {
    path: "/",
    index: true,
    element: <Home />,
    errorElement: <NotFoundPageError />,
  },
  {
    path: "/story/:slug",
    errorElement: <NotFoundPageError />,
    element: <Story />,
  },
  {
    path: "/story/:slug/edit",
    errorElement: <NotFoundPageError />,
    element: <div>check this</div>,
  },
  {
    path: "/trending",
    errorElement: <NotFoundPageError />,
    element: <Trending />,
  },
  {
    path: "/login",
    errorElement: <NotFoundPageError />,
    element: <Login />,
  },
  {
    path: "/signup",
    errorElement: <NotFoundPageError />,
    element: <Signup />,
  },
  {
    path: "/forgot_password",
    errorElement: <NotFoundPageError />,
    element: <ForgotPassword />,
  },
  {
    path: "/send_messages",
    errorElement: <NotFoundPageError />,
    element: <SendMessage />,
  },
  {
    path: "/set_password",
    element: <SetNewPassword />,
  },
  {
    path: "/profile/:id_user",
    errorElement: <NotFoundPageError />,
    element: <Profile />,
    isNeedProtected: true,
  },
  {
    path: "/postman",
    errorElement: <NotFoundPageError />,
    element: <Postman />,
  },
];

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <StylesProvider>
          <Routes>
            {ROUTER.map((router) => {
              if (router.isNeedProtected) {
                return (
                  <Route
                    key={router.path}
                    path={router.path}
                    element={<ProtectedRoute>{router.element}</ProtectedRoute>}
                  />
                );
              }

              return <Route key={router.path} {...router} />;
            })}
          </Routes>
        </StylesProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
