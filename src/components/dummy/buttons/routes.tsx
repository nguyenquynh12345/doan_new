import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const Buttons = React.lazy(() => import('./buttons/Buttons'));
const LoadingButtons = React.lazy(() => import('./loading-buttons/LoadingButtons'));
const ButtonGroups = React.lazy(() => import('./button-groups/ButtonGroups'));
const Dropdowns = React.lazy(() => import('./dropdowns/Dropdowns'));

const ButtonLayout: RouteObject[] = [
  { path: '/', element: <Buttons /> },
  { path: 'buttons', element: <Buttons /> },
  { path: 'loading-buttons', element: <LoadingButtons /> },
  { path: 'dropdowns', element: <Dropdowns /> },
  { path: 'button-groups', element: <ButtonGroups /> },
  { path: '*', element: <Navigate to="/404" /> },
];

const ButtonRoutes = () => useRoutes(ButtonLayout);
export default ButtonRoutes;
