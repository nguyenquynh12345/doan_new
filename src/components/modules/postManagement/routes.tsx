import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const PostManagement = React.lazy(() => import('./PostManagement'));

export const userManagementLayout: RouteObject[] = [
    { path: '/', element: <PostManagement /> },
    { path: '*', element: <Navigate to="/404" replace /> },
];

const UserManagementRoutes = () => useRoutes(userManagementLayout);
export default UserManagementRoutes;
