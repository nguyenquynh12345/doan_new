import { RootState } from '@/reducers';
import { intersection } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import { RootState } from '../../../reducers';
import { Roles } from '@/shared/enumeration/roles';
import { Permission } from '@shared/enumeration/permission';
import { useRouter } from '@shared/utils/hooks/useRouter';

interface IProtectedComponentProp {
  children: React.ReactNode;
  requiredPerms: [];
}

// export const checkIfUserIsAdmin = (userAuthorities: TAuthorities[]): boolean => {
//   return userAuthorities.includes(Permission.ROLE_ADMIN);
// };

export const checkOverlapBetweenPerms = (userAuthorities: Permission[], requiredPerms: Permission[]): boolean => {
  const overlappedPerms = intersection(requiredPerms, userAuthorities);
  return Boolean(overlappedPerms.length);
};

export const checkOverlapBetweenRoles = (userRoles: Roles[], requiredRoles: Roles[]): boolean => {
  const overlappedRoles = intersection(requiredRoles, userRoles);
  return Boolean(overlappedRoles.length);
};

export const ProtectedComponent = ({ children, requiredPerms }: IProtectedComponentProp) => {
  const { userInfo } = useSelector((state: RootState) => state.authentication);
  const { location } = useRouter();

  if (!userInfo) return <Navigate to="/auth/login" state={{ path: location.pathname }} />;

  const { permissions } = userInfo;
  // if (checkIfUserIsAdmin(authorities)) return <>{children}</>;
  return checkOverlapBetweenPerms(permissions, requiredPerms) ? <>{children}</> : <Navigate to="/403" replace />;
};

// export const ProtectedComponent = ({ children }: IProtectedComponentProp) => {
//   const { userInfo } = useSelector((state: RootState) => state.authentication);
//   const { location } = useRouter();

//   if (!userInfo) return <Navigate to="/auth/login" state={{ path: location.pathname }} />;

//   return <>{children}</>;
// };
