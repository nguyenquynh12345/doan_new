import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const CoreUIIcons = React.lazy(() => import('./coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./flags/Flags'));
const Brands = React.lazy(() => import('./brands/Brands'));

const iconLayout: RouteObject[] = [
  { path: '/', element: <CoreUIIcons /> },
  { path: 'coreui-icons', element: <CoreUIIcons /> },
  { path: 'flags', element: <Flags /> },
  { path: 'brands', element: <Brands /> },
  { path: '*', element: <Navigate to="/404" /> },
];

const IconRoutes = () => useRoutes(iconLayout);
export default IconRoutes;
