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
  CUSTOMER_UNIT_DELETE: IP_URL + '/unit/',
  CUSTOMER_UNIT_DETAILS_UPDATE: IP_URL + '/customer/unit-details-update',
  CUSTOMER_UNIT_ADD_QR: IP_URL + '/unit/update-qr-code',
  CUSTOMER_UNIT_REMOVE_QR: IP_URL + '/unit/remove-qr-code/',

  WORK_ORDRS_BY_UNIT: IP_URL + '/work-order/byUnit/',
  WORK_ORDR: IP_URL + '/work-order/',
  WORK_ORDR_DELETE: IP_URL + '/work-order/',
  WORK_ORDR_ASSIGN: IP_URL + '/work-order/add-employees',
  WORK_ORDR_UPLOAD: IP_URL + '/work-order/upload-images/',
  WORK_ORDR_UPDATE: IP_URL + '/work-order/',
  WORK_ORDR_FINISH: IP_URL + '/work-order/complete/',
  WORK_ORDR_ADD: IP_URL + '/work-order/add-job',
  WORK_ORDR_TIP: IP_URL + '/work-order/tips',
  WORK_ORDR_DELETE_IMAGES: IP_URL + '/work-order/delete-files',
  WORK_ORDR_CHARGERS: IP_URL + '/work-order/chargers',
  WORK_ORDR_TODAYS_COUNT: IP_URL + '/work-order/today-count',
  WORK_ORDR_DOWNLOAD_INVOICE: IP_URL + '/work-order/download-invoice/',

  QR_CODE_AVAILABLES: IP_URL + '/qr-code/',
  QR_CODE_UNIT_HISTORY: IP_URL + '/unit/unit-by-qr/',
  QR_CODE_GENERATE: IP_URL + '/qr-code/generate',
  QR_CODE_COUNT: IP_URL + '/qr-code/count',
};
