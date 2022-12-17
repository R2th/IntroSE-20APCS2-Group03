import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "components/Navbar";
import ForgotPassword from "./components/ForgotPassword";
import SendMessage from "./components/FP_SendMessage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/Auth/authContext";
import { StylesProvider } from "./contexts/Styles/stylesContext";
import Content from "./pages/Content";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFoundPageError from "./pages/NotFoundPage";
import Postman from "./pages/Postman";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

const ROUTER = [
  {
    path: "/",
    index: true,
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
    path: "/forgot_password",
    element: <ForgotPassword />,
  },
  {
    path: "/send_messages",
    element: <SendMessage />,
  },
  {
    path: "/profile/:id_user",
    element: <Profile />,
    isNeedProtected: true,
  },
  {
    path: "/postman",
    element: <Postman />,
  },
];

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <StylesProvider>
          <Navbar />
          <Routes>
            {ROUTER.map((router) => {
              if (router.isNeedProtected) {
                console.log("???");
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
