import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const FeedbackManagement = React.lazy(() => import('./Feedback'));
const DetailFeedback = React.lazy(() => import('./DetailFeedback'));



export const feedbackRequestLayout: RouteObject[] = [
    { path: '/', element: <FeedbackManagement /> },
    { path: '/detail/:id', element: <DetailFeedback /> },
    { path: '*', element: <Navigate to="/404" replace /> },
];

const FeedbackRoutes = () => useRoutes(feedbackRequestLayout);
export default FeedbackRoutes;
