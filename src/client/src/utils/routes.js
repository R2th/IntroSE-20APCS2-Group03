/*eslint-disable*/
import Story from 'pages/Story';
import Home from 'pages/Home';
import Login from 'pages/Login';
import NotFoundPageError from 'pages/NotFoundPage';
import Postman from 'pages/Postman';
import Profile from 'pages/Profile';
import Signup from 'pages/Signup';
import Trending from 'pages/Trending';

import ForgotPassword from 'components/ForgotPassword';
import SendMessage from 'components/FP_SendMessage';
import SetNewPassword from 'components/SetNewPassword';
import ProtectedRoute from 'components/ProtectedRoute';
import Editor from 'components/Editor';

export const AUTH_ROUTES = [
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    path: 'forgot_password',
    element: <ForgotPassword />,
  },
  {
    path: 'send_messages',
    element: <SendMessage />,
  },
  {
    path: 'set_password',
    element: <SetNewPassword />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
];

export const ROUTES = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: 'story',
    errorElement: <NotFoundPageError />,
    children: [
      {
        path: ':slug',
        element: <Story />,
      },
      {
        path: ':slug/edit',
        element: <Editor />,
      },
      {
        path: 'trending',
        element: <Trending />,
      },
    ],
  },
  {
    path: 'profile/:id_user',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: 'postman',
    element: <Postman />,
  },
  {
    path: 'auth',
    children: AUTH_ROUTES,
  },
];
