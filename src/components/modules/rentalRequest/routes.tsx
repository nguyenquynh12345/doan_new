import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const RentalRequestManagement = React.lazy(() => import('./RentalRequestManagement'));



export const rentalRequestLayout: RouteObject[] = [
    { path: '/', element: <RentalRequestManagement /> },
    { path: '*', element: <Navigate to="/404" replace /> },
];

const RentalRequestRoutes = () => useRoutes(rentalRequestLayout);
export default RentalRequestRoutes;
