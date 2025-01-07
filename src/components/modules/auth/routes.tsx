import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const Login = React.lazy(() => import('./Login'));
const Register = React.lazy(() => import('./Register'));
const ActiveAccount = React.lazy(() => import('./ActiveAccount'));


export const authLayout: RouteObject[] = [
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
  { path: 'active-account/:id', element: <ActiveAccount /> },

  { path: '*', element: <Navigate to="/404" replace /> },
];

const AuthRoutes = () => useRoutes(authLayout);
export default AuthRoutes;
