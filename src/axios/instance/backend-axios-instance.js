import axios from 'axios';
import { v1 as uuid } from 'uuid';

import common_util from 'src/utils/common-util';

import { SNACKBAR_MESSAGE } from 'src/constants/snackbar-constants';
import responseUtil from 'src/utils/responseUtil';
import useAuthStore from 'src/store/auth-store';
import useSnackbarStore from 'src/store/notification-store';

export const backendAuthApi = axios.create({
  // one minute timeout
  timeout: 60000,
});

backendAuthApi.interceptors.request.use((request) => {
  const { auth } = useAuthStore.getState();

  const bearerToken = auth ? auth.user.token : null;

  if (bearerToken) {
    request.headers.Authorization = `Bearer ${bearerToken}`;
  }
  return request;
});

backendAuthApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { logoutUser } = useAuthStore.getState();
    const { enqueueSnackbar } = useSnackbarStore.getState();

    if (error && !axios.isCancel(error)) {
      let errorMessage = SNACKBAR_MESSAGE.SOMETHING_WENT_WRONG.MESSAGE;
      let errorCode = null;

      if (error.response) {
        const errorResponse = error.response.data;
        if (!common_util.isUndefinedOrNull(errorResponse.responseMessage)) {
          errorMessage = errorResponse.responseMessage;
          errorCode = errorResponse.responseCode;
        }

        /**
         * Logout user if the response code matches the below mentioned
         * AUTH-002 is returned if user's token is expired
         * AUTH-003 is returned if user's token is invalid
         * AUTH-004 is returned if user is disabled
         */

        if (errorResponse.responseCode === 'AUTH-004') {
          logoutUser();

          if (!window.location.pathname.includes(NAVIGATION_ROUTES.login)) {
            window.location.href = NAVIGATION_ROUTES.login;
          }
        }
      }

      enqueueSnackbar({
        message: errorMessage,
        options: {
          key: uuid(),
          variant: errorCode
            ? responseUtil.findResponseType(errorCode)
            : SNACKBAR_MESSAGE.SOMETHING_WENT_WRONG.VARIANT,
        },
      });
    }
    return Promise.reject(error);
  }
);
