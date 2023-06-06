import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import AuthRoute from '@/components/AuthRoute';

import Landing from '@/pages/Landing';
import Root from '@/pages/Root';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';

const CurrentBooking = lazy(() => import('@/pages/CurrentBooking'));
const Babysitters = lazy(() => import('@/pages/Babysitters'));
const About = lazy(() => import('@/pages/About'));
const Settings = lazy(() => import('@/pages/Settings'));
const Babysitter = lazy(() => import('@/pages/Babysitter'));
const Terms = lazy(() => import('@/pages/Terms'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'terms',
        element: <Terms />,
      },
      {
        element: <AuthRoute />,
        children: [
          { path: 'current-booking', element: <CurrentBooking /> },
          {
            path: 'babysitter/:id',
            element: <Babysitter />,
          },
          {
            path: 'babysitters',
            element: <Babysitters />,
          },
          { path: 'settings', element: <Settings /> },
        ],
      },
      {
        element: <AuthRoute guestOnly />,
        children: [{ path: 'login', element: <Login /> }],
      },
      { path: '/404', element: <NotFound /> },
      {
        path: '*',
        element: <Navigate to='/404' replace />,
      },
    ],
  },
]);
