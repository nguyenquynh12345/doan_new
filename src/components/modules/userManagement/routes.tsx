import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const UserManagement = React.lazy(() => import('./UserManagement'));

export const userManagementLayout: RouteObject[] = [
  { path: '/', element: <UserManagement /> },
  { path: '*', element: <Navigate to="/404" replace /> },
];

const UserManagementRoutes = () => useRoutes(userManagementLayout);
export default UserManagementRoutes;
