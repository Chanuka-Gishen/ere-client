export const NAVIGATION_ROUTES = {
  // authentication routes
  login: 'login',
  register: 'register',

  // not found
  not_found: '404',
  all_path: '*',

  // main routes
  dashboard: 'dashboard',
  overview_details: 'dashboard/overviewDetails',
  customers: 'customers',
  customer_details: 'customers/details/:id',
  customer_job_details: 'customers/details/:id/:jobId',
  employees: 'employees',
};
