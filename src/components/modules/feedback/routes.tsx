import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const FeedbackManagement = React.lazy(() => import('./Feedback'));



export const feedbackRequestLayout: RouteObject[] = [
    { path: '/', element: <FeedbackManagement /> },
    { path: '*', element: <Navigate to="/404" replace /> },
];

const FeedbackRoutes = () => useRoutes(feedbackRequestLayout);
export default FeedbackRoutes;
