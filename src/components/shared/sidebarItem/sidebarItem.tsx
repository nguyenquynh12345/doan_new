import { Permission } from '@/shared/enumeration/permission';
import DotIcon from '@assets/img/common/dot.svg?react';
import UserIcon from '@assets/img/sidebar/users-01.svg?react';
import { ReactNode } from 'react';

export interface SidebarItem {
  name: ReactNode;
  to: string;
  icon?: ReactNode;
  isTitle?: boolean;
  subItems?: SidebarItem[];
  permissions?: Permission[];
}

export const adminSidebarItems: SidebarItem[] = [
  {
    name: 'Người dùng',
    to: `user-management`,
    icon: <UserIcon className="nav-icon" />,
    // subItems: [
    //   {
    //     name: 'Bill chuyển khoản',
    //     to: `/billTransfer`,
    //     icon: <DotIcon className="nav-icon" />,
    //   },
    // ],
  },
];
