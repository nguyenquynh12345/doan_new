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
    name: 'Quản lý người dùng',
    to: `user-management`,
    icon: <UserIcon className="nav-icon" />,
  },
  {
    name: 'Quản lý bài đăng',
    to: `post-management`,
    icon: <UserIcon className="nav-icon" />,
    subItems: [
      {
        name: 'Tất cả bài đăng',
        to: `post-management`,
        icon: <DotIcon className="nav-icon" />,
      },
      {
        name: 'Tạo bài đăng',
        to: `post-management/create`,
        icon: <DotIcon className="nav-icon" />,
      },
    ],
  },
  {
    name: 'Phê duyệt bài đăng',
    to: `rental-request`,
    icon: <UserIcon className="nav-icon" />,
  },
  {
    name: 'Quản lý danh mục',
    to: `categories`,
    icon: <UserIcon className="nav-icon" />,
  },
  {
    name: 'Quản lý khu vực',
    to: `location`,
    icon: <UserIcon className="nav-icon" />,
  },
  {
    name: 'Feedback của khách hàng',
    to: `feedback`,
    icon: <UserIcon className="nav-icon" />,
  },
];
