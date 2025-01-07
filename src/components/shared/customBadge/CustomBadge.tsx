import { CBadge } from '@coreui/react-pro';
import React from 'react';

export interface ICustomBadgeProps {
  color?: 'secondary' | 'success' | 'danger' | 'warning' | 'info' | string;
  shape?: string;
  children: React.ReactNode;
}

const CustomBadge = (props: ICustomBadgeProps) => {
  const { children, color } = props;
  return (
    <>
      <CBadge className={`custom-badge ${color || ''}`}>{children}</CBadge>
    </>
  );
};

export default CustomBadge;
