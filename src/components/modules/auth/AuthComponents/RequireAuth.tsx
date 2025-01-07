import { RootState } from '@/reducers';
import { useRouter } from '@shared/utils/hooks/useRouter';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface IRequireAuthProp {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: IRequireAuthProp) => {
  const { location } = useRouter();
  const { userInfo, token } = useSelector((state: RootState) => state.authentication);
  const tempToken = token || localStorage.getItem('authentication_token');

  if (!userInfo && !tempToken) {
    return <Navigate to="/auth/login" replace state={{ path: location.pathname }} />;
  }

  return <>{children}</>;
};
