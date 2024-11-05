export const NAVIGATION_ROUTES = {
  // authentication routes
  login: 'login',
  set_password: 'setPassword',
  register: 'register',

  // public routes
  customer_unit: 'unit/:id',

  // not found
  not_found: '404',
  all_path: '*',

  // main routes
  dashboard: 'dashboard',
  overview_details: 'dashboard/overviewDetails/:id',
  customers: 'customers',
  customer_details: 'customers/details/:id',
  customer_job_details: 'customers/details/job/:jobId',
  units: {
    base: 'units',
  },
  employees: {
    base: 'employees',
    employee: {
      base: 'employees/',
      id: 'employees/:id',
    },
  },
  work_orders: 'work-orders',
  work_order_details: 'work-orders/:jobId',
  invoices: 'invoices',
};
