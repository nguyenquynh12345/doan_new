import TheHeader from '@/components/containers/TheHeader';
import { CSpinner } from '@coreui/react-pro';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const loading = (
  <div className="text-center">
    <CSpinner color="primary" />
  </div>
);

const TheAuthLayout = () => {
  return (
    <div className=" d-flex flex-column min-vh-100 bg-light">
      <TheHeader notAuth/>
      <div className="wrapper-main flex-grow-1 w-100">
        <Suspense fallback={loading}>
          <Outlet />
        </Suspense>
      </div>

      {/* <TheFooter /> */}
    </div>
  );
};

export default TheAuthLayout;
