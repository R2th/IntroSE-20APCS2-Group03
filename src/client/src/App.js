import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Content from "./pages/Content";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import NotFoundPageError from "./pages/NotFoundPage";
import { AuthProvider } from "./contexts/Auth/authContext";
import ProtectedRoute from "./components/ProtectedRoute";

const ROUTER = [
  {
    path: "/",
    index: true,
    element: <Home />,
    errorElement: <NotFoundPageError />,
    isNeedProtected: true,
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
    isNeedProtected: true,
  },
];

const App = () => {
  return (
    <Router>
      <AuthProvider>
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
      </AuthProvider>
    </Router>
  );
};

export default App;
