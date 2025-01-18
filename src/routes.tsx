import { lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import DummyLanding from './components/dummy/Dashboard';
import BaseRoutes from './components/dummy/base/routes';
import ButtonRoutes from './components/dummy/buttons/routes';
import FormRoutes from './components/dummy/forms/routes';
import IconRoutes from './components/dummy/icons/routes';
import NotificationRoutes from './components/dummy/notifications/routes';
import ThemeRoutes from './components/dummy/theme/routes';
import ErrorElement from './components/shared/errorBoundary/ErrorElement';
import TheLayout from './components/containers/TheLayout';
import TheAuthLayout from './components/modules/auth/TheAuthLayout';
import { authLayout } from './components/modules/auth/routes';
import { RequireAuth } from './components/modules/auth/AuthComponents/RequireAuth';
import UserManagementRoutes from './components/modules/userManagement/routes';
import PostManagementRoutes from './components/modules/postManagement/routes';
import RentalRequestRoutes from './components/modules/rentalRequest/routes';
import FeedbackRoutes from './components/modules/feedback/routes';

const Table = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 3000)).then(() => import('./components/dummy/Table'));
});
const TransferView = lazy(() => import('@components/modules/shared/transferView/TransferView'));
const Dashboard = lazy(() => import('./components/dummy/dashboard/Dashboard'));

const Charts = lazy(() => import('./components/dummy/charts/Charts'));
const Widgets = lazy(() => import('./components/dummy/widgets/Widgets'));
// Error pages

const Page404 = lazy(() => import('./components/modules/Page404'));
const Page500 = lazy(() => import('./components/modules/Page500'));
const Page403 = lazy(() => import('./components/modules/Page403'));

export const privateRoutes: RouteObject[] = [
  { path: '', element: <TransferView route={''} /> },
  { path: 'dummy', element: <DummyLanding /> },
  { path: 'user-management/*', element: <UserManagementRoutes /> },
  { path: 'post-management/*', element: <PostManagementRoutes /> },
  { path: 'rental-request/*', element: <RentalRequestRoutes /> },
  { path: 'feedback/*', element: <FeedbackRoutes /> },
  { path: 'table', element: <Table /> },
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'theme/*', element: <ThemeRoutes /> },
  { path: 'base/*', element: <BaseRoutes /> },
  { path: 'buttons/*', element: <ButtonRoutes /> },
  { path: 'charts', element: <Charts /> },
  { path: 'forms/*', element: <FormRoutes /> },
  { path: 'icons/*', element: <IconRoutes /> },
  { path: 'notifications/*', element: <NotificationRoutes /> },
  { path: 'widgets', element: <Widgets /> },
  { path: '*', element: <Navigate to="/404" replace /> },
];

export const publicRoutes: RouteObject[] = [
  {
    path: '/auth/*',
    element: <TheAuthLayout />,
    children: authLayout,
    caseSensitive: true,
  },
  {
    path: '/*',
    element: (
      <RequireAuth>
        <TheLayout />
      </RequireAuth>
    ),
    children: privateRoutes,
    caseSensitive: true,
  },

  { path: '/404', element: <Page404 /> },
  { path: '/500', element: <Page500 /> },
  { path: '/403', element: <Page403 /> },

  // { path: '/auth/*', element: <AuthRoutes /> },
  { path: '*', element: <Navigate to="/404" replace /> },
];

/**
 * Because React router has it own error boundary, so the error inside it will not bubble up to the root error boundary
 * So we need to wrap the root route with it own errorElement to handle the error view
 * https://reactrouter.com/en/main/route/error-element
 *
 * This is a workaround for the issue -> wrap all routen in 1 root router and then handle top level error
 */
// const loading = (
//   <div className="text-center">
//     <CSpinner color="warning" />
//   </div>
// );

const RootElement = () => {
  return <Outlet />;
};

export const rootRoutes: RouteObject[] = [
  {
    element: <RootElement />,
    children: publicRoutes,
    errorElement: <ErrorElement />,
  },
];
