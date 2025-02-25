import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const CategoryManagement = React.lazy(() => import('./CategoryManagement'));

export const userManagementLayout: RouteObject[] = [
    { path: '/', element: <CategoryManagement /> },
    { path: '*', element: <Navigate to="/404" replace /> },
];

const CategoryManagementRoutes = () => useRoutes(userManagementLayout);
export default CategoryManagementRoutes;
