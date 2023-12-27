// SERVER URL
const IP_URL = import.meta.env.VITE_SERVER_URL;

// URIs
export const BACKEND_API = {
  // AUTHENTICATION API'S
  REGISTER: IP_URL + '/employee/register',
  LOGIN: IP_URL + '/employee/login',
  LOGOUT: IP_URL + '/employee/logout',

  EMPLOYEES_ALL: IP_URL + '/employee/',
  EMPLOYEE_UPDATE: IP_URL + '/employee/update',
  EMPLOYEE_DELETE: IP_URL + '/employee/delete/',

  CUSTOMERS_ALL: IP_URL + '/customer/',
  CUSTOMER_ADD: IP_URL + '/customer/register',
};
