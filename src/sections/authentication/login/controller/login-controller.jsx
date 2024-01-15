import React, { useState } from 'react';

import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import * as Yup from 'yup';

import { LoginView } from '../view/login-view';
import authAction from 'src/store/action/authAction';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { useRouter } from 'src/routes/hooks';

import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';
import { SNACKBAR_VARIANT } from 'src/constants/snackbar-constants';

//-------------------------------------------------------

const validationSchema = Yup.object().shape({
  userName: Yup.string().required('User Name is required'),
  userPassword: Yup.string().required('Password is required'),
});

const LoginController = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  let cancelToken = axios.CancelToken.source();

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: '',
      userPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      null;
    },
  });

  const handleLogin = async () => {
    if (formik.isValid && formik.dirty) {
      setIsLoading(true);

      await backendAuthApi({
        url: BACKEND_API.LOGIN,
        method: 'POST',
        cancelToken: cancelToken.token,
        data: formik.values,
      })
        .then((res) => {
          const data = res.data;
          if (responseUtil.isResponseSuccess(data.responseCode)) {
            dispatch(authAction.loginUser(data.responseData));

            if (data.responseData.userNewPwd) {
              router.push(NAVIGATION_ROUTES.set_password);
            } else {
              dispatch(authAction.updateLoginStatus());
              router.push(NAVIGATION_ROUTES.dashboard);
            }
          } else {
            enqueueSnackbar(data.responseMessage, {
              variant: SNACKBAR_VARIANT.ERROR,
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return <LoginView handleLogin={handleLogin} formik={formik} isLoading={isLoading} />;
};

export default LoginController;
