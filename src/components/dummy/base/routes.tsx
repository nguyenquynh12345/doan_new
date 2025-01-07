import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const Accordion = React.lazy(() => import('./accordion/Accordion'));
const Breadcrumbs = React.lazy(() => import('./breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./cards/Cards'));
const Callout = React.lazy(() => import('./callout/Callout'));
const Carousels = React.lazy(() => import('./carousels/Carousels'));
const Collapses = React.lazy(() => import('./collapses/Collapses'));
const Jumbotrons = React.lazy(() => import('./jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./list-groups/ListGroups'));
const Navs = React.lazy(() => import('./navs/Navs'));
const Offcanvas = React.lazy(() => import('./offcanvas/Offcanvas'));
const Paginations = React.lazy(() => import('./paginations/Paginations'));
const Placeholders = React.lazy(() => import('./placeholders/Placeholders'));
const Popovers = React.lazy(() => import('./popovers/Popovers'));
const Progress = React.lazy(() => import('./progress/Progress'));
const Spinners = React.lazy(() => import('./spinners/Spinners'));
const Tables = React.lazy(() => import('./tables/Tables'));
const Tooltips = React.lazy(() => import('./tooltips/Tooltips'));

const baseLayout: RouteObject[] = [
  { path: '/', element: <Accordion /> },
  { path: 'accordion', element: <Accordion /> },
  { path: 'breadcrumbs', element: <Breadcrumbs /> },
  { path: 'cards', element: <Cards /> },
  { path: 'callout', element: <Callout /> },
  { path: 'carousels', element: <Carousels /> },
  { path: 'collapses', element: <Collapses /> },
  { path: 'jumbotrons', element: <Jumbotrons /> },
  { path: 'list-groups', element: <ListGroups /> },
  { path: 'navs', element: <Navs /> },
  { path: 'offcanvas', element: <Offcanvas /> },
  { path: 'paginations', element: <Paginations /> },
  { path: 'placeholders', element: <Placeholders /> },
  { path: 'popovers', element: <Popovers /> },
  { path: 'progress', element: <Progress /> },
  { path: 'spinners', element: <Spinners /> },
  { path: 'tables', element: <Tables /> },
  { path: 'tooltips', element: <Tooltips /> },
  { path: '*', element: <Navigate to="/404" /> },
];

const BaseRoutes = () => useRoutes(baseLayout);
export default BaseRoutes;
