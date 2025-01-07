import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const Colors = React.lazy(() => import('./colors/Colors'));
const Typography = React.lazy(() => import('./typography/Typography'));

const themeLayout: RouteObject[] = [
  { path: '/', element: <Colors /> },
  { path: 'colors', element: <Colors /> },
  { path: 'typography', element: <Typography /> },
  { path: '*', element: <Navigate to="/404" /> },
];

const ThemeRoutes = () => useRoutes(themeLayout);
export default ThemeRoutes;
