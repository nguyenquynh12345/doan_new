import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const PostManagement = React.lazy(() => import('./PostManagement'));
const DetailPost = React.lazy(() => import('./DetailPost'));
const CreatePost = React.lazy(() => import('./CreatePost'));

export const userManagementLayout: RouteObject[] = [
  { path: '/', element: <PostManagement /> },
  { path: '/detail/:id', element: <DetailPost /> }, // Tuyến đường động cho chi tiết bài viết
  { path: '/create', element: <CreatePost /> }, // Tuyến đường tạo bài viết mới
  { path: '/edit/:id', element: <CreatePost /> }, // Tuyến đường sửa bài viết, ví dụ dùng cho chỉnh sửa
];

const PostManagementRoutes = () => useRoutes(userManagementLayout);
export default PostManagementRoutes;
