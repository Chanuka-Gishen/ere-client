import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import { NAVIGATION_ROUTES } from './navigation-routes';
import { useSelector } from 'react-redux';
import EmployeesPage from 'src/pages/employees';
import JobDetailsPage from 'src/pages/job-details';

export const IndexPage = lazy(() => import('src/pages/app'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const CustomersPage = lazy(() => import('src/pages/customers'));

// ----------------------------------------------------------------------

// Authenticated Routes
const AuthenticatedRoutes = (
  <DashboardLayout>
    <Suspense>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

// Public Routes
const PublicRoutes = [
  { path: NAVIGATION_ROUTES.login, element: <LoginPage /> },
  { path: NAVIGATION_ROUTES.not_found, element: <Page404 /> },
  { path: NAVIGATION_ROUTES.all_path, element: <Navigate to={NAVIGATION_ROUTES.login} replace /> }, // Redirect to login if not authenticated
];

const Router = () => {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  const routes = useRoutes([
    {
      path: '/',
      element: isAuthenticated ? (
        AuthenticatedRoutes
      ) : (
        <Navigate to={NAVIGATION_ROUTES.login} replace />
      ),
      children: [
        { path: '/', element: <Navigate to={NAVIGATION_ROUTES.dashboard} replace /> },
        { path: NAVIGATION_ROUTES.dashboard, element: <IndexPage /> },
        { path: NAVIGATION_ROUTES.customers, element: <CustomersPage /> },
        { path: NAVIGATION_ROUTES.employees, element: <EmployeesPage /> },
        { path: NAVIGATION_ROUTES.job_details, element: <JobDetailsPage /> },
      ],
    },
    ...PublicRoutes,
  ]);

  return routes;
};

export default Router;
