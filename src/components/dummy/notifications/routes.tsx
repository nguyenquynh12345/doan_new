import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const Alerts = React.lazy(() => import('./alerts/Alerts'));
const Badges = React.lazy(() => import('./badges/Badges'));
const Modals = React.lazy(() => import('./modals/Modals'));
const Toasts = React.lazy(() => import('./toasts/Toasts'));

const notificationLayout: RouteObject[] = [
  { path: '/', element: <Alerts /> },
  { path: 'alerts', element: <Alerts /> },
  { path: 'badges', element: <Badges /> },
  { path: 'modals', element: <Modals /> },
  { path: 'toasts', element: <Toasts /> },
  { path: '*', element: <Navigate to="/404" /> },
];

const NotificationRoutes =  () => useRoutes(notificationLayout);
export default NotificationRoutes;
