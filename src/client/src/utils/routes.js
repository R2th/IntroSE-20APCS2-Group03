/*eslint-disable */
import Story from 'pages/Story';
import Home from 'pages/Home';
import Login from 'pages/Login';
import NotFoundPageError from 'pages/NotFoundPage';
import Profile from 'pages/Profile';
import Signup from 'pages/Signup';
import Trending from 'pages/Trending';

import ForgotPassword from 'components/ForgotPassword';
import SendMessage from 'components/FP_SendMessage';
import SetNewPassword from 'components/SetNewPassword';

import Editor from 'components/Editor';
import Payment from 'components/Payment';
import UserStories from 'components/Profile/Stories';
import UserComments from 'components/Profile/Comments';
import Settings from 'components/Profile/Settings';
import ProtectedRoute from 'components/ProtectedRoute';
import SaveList from 'components/Profile/SaveList';

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
    path: '@' + ':userId',
    element: <Profile />,
    children: [
      {
        path: 'stories',
        element: (
          <ProtectedRoute>
            <UserStories />
          </ProtectedRoute>
        ),
        index: true,
      },
      {
        path: 'saved',
        element: (
          <ProtectedRoute>
            <SaveList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'comments',
        element: <UserComments />,
      },
    ],
  },
  {
    path: 'settings',
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: 'auth',
    children: AUTH_ROUTES,
  },
  {
    path: 'premium',
    element: <Payment />,
  },
];
