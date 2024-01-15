// SERVER URL
const IP_URL = import.meta.env.VITE_SERVER_URL;

// URIs
export const BACKEND_API = {
  // AUTHENTICATION API'S
  REGISTER: IP_URL + '/employee/register',
  LOGIN: IP_URL + '/employee/login',
  SET_PASSWORD: IP_URL + '/employee/set-pwd',
  LOGOUT: IP_URL + '/employee/logout',

  EMPLOYEES_RESET_PWD: IP_URL + '/employee/reset-pwd/',
  EMPLOYEES_ALL: IP_URL + '/employee/',
  EMPLOYEE_UPDATE: IP_URL + '/employee/update',
  EMPLOYEE_DELETE: IP_URL + '/employee/delete/',
  EMPLOYEE_SELECT: IP_URL + '/employee/select',
  EMPLOYEE_JOBS: IP_URL + '/work-order/emp-jobs',

  CUSTOMERS_ALL: IP_URL + '/customer/',
  CUSTOMER_ADD: IP_URL + '/customer/register',
  CUSTOMER_INFO: IP_URL + '/customer/customer-details/',
  CUSTOMER_INFO_UPDATE: IP_URL + '/customer/',
  CUSTOMER_UNITS: IP_URL + '/customer/unit/',

  CUSTOMER_UNIT_ADD: IP_URL + '/customer/unit',
  CUSTOMER_UNIT_UPDATE: IP_URL + '/customer/unit',

  WORK_ORDRS_BY_UNIT: IP_URL + '/work-order/byUnit/',
  WORK_ORDR: IP_URL + '/work-order/',
  WORK_ORDR_ASSIGN: IP_URL + '/work-order/add-employees',
  WORK_ORDR_UPLOAD: IP_URL + '/work-order/upload-images/',
  WORK_ORDR_UPDATE: IP_URL + '/work-order/',
  WORK_ORDR_FINISH: IP_URL + '/work-order/complete/',
  WORK_ORDR_ADD: IP_URL + '/work-order/add-job',
};
