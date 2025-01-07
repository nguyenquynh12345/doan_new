import { RootState } from '@/reducers';
import { rootRoutes } from '@/routes';
import { AppDispatch } from '@/store';
import { CSpinner } from '@coreui/react-pro';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { getUserInfo } from '../modules/auth/auth.api';
import { fetchingUserInfo } from '../modules/auth/auth.reducer';

const loading = (
  <div className="text-center">
    <CSpinner color="primary" />
  </div>
);

const TheContainer = () => {
  const routeRender = createBrowserRouter(rootRoutes);

  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.authentication);

  useEffect(() => {
    let tempToken = token;
    if (!tempToken) {
      tempToken = localStorage.getItem('authentication_token');
    }

    if (tempToken) {
      dispatch(fetchingUserInfo());
      dispatch(getUserInfo());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Suspense fallback={loading}>
      <div className="main">
        <RouterProvider router={routeRender} />
      </div>
    </Suspense>
  );
};

export default TheContainer;
