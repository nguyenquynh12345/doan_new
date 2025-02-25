import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const LocationManagement = React.lazy(() => import('./LocationManagement'));

export const userManagementLayout: RouteObject[] = [
    { path: '/', element: <LocationManagement /> },
    { path: '*', element: <Navigate to="/404" replace /> },
];

const LocationManagementRoutes = () => useRoutes(userManagementLayout);
export default LocationManagementRoutes;
