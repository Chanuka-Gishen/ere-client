// SERVER URL
//const IP_URL = 'http://16.171.17.70:3001';
const IP_URL = 'http://localhost:3004/server';

// URIs
export const BACKEND_API = {
  // AUTHENTICATION API'S
  REGISTER: IP_URL + '/employee/register',
  LOGIN: IP_URL + '/employee/login',
  LOGOUT: IP_URL + '/employee/logout',

  EMPLOYEES_ALL: IP_URL + '/employee/',
  EMPLOYEE_UPDATE: IP_URL + '/employee/update',
  EMPLOYEE_DELETE: IP_URL + '/employee/delete/',
};
