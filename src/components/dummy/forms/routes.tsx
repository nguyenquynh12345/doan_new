import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const ChecksRadios = React.lazy(() => import('./checks-radios/ChecksRadios'));
const FloatingLabels = React.lazy(() => import('./floating-labels/FloatingLabels'));
const FormControl = React.lazy(() => import('./form-control/FormControl'));
const InputGroup = React.lazy(() => import('./input-group/InputGroup'));
const Layout = React.lazy(() => import('./layout/Layout'));
const Range = React.lazy(() => import('./range/Range'));
const Select = React.lazy(() => import('./select/Select'));
const MultiSelect = React.lazy(() => import('./multi-select/MultiSelect'));
const Validation = React.lazy(() => import('./validation/Validation'));

const formLayout: RouteObject[] = [
  { path: '/', element: <FormControl /> },
  { path: 'form-control', element: <FormControl /> },
  { path: 'select', element: <Select /> },
  { path: 'multi-select', element: <MultiSelect /> },
  { path: 'checks-radios', element: <ChecksRadios /> },
  { path: 'range', element: <Range /> },
  { path: 'input-group', element: <InputGroup /> },
  { path: 'floating-labels', element: <FloatingLabels /> },
  { path: 'layout', element: <Layout /> },
  { path: 'validation', element: <Validation /> },
  { path: '*', element: <Navigate to="/404" /> },
];

const FormRoutes = () => useRoutes(formLayout);
export default FormRoutes;
