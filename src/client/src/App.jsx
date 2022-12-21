import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/Auth/authContext';
import { StylesProvider } from './contexts/Styles/stylesContext';
import NotFoundPageError from './pages/NotFoundPage';
import { ROUTES } from './utils/routes';

const ROOT = [
  {
    path: '/',
    element: (
      <AuthProvider>
        <StylesProvider>
          <Navbar />
          <Outlet />
        </StylesProvider>
      </AuthProvider>
    ),
    errorElement: <NotFoundPageError />,
    children: ROUTES,
  },
];

function App() {
  return <RouterProvider router={createBrowserRouter(ROOT)} />;
}

export default App;
