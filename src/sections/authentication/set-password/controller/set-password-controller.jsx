import React, { useState } from 'react';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import { SetPasswordView } from '../view/set-password-view';
import axios from 'axios';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'notistack';
import { SNACKBAR_MESSAGE, SNACKBAR_VARIANT } from 'src/constants/snackbar-constants';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';

const validationSchema = Yup.object().shape({
  userPassword: Yup.string().required('Password is required'),
  userConfirmPassword: Yup.string()
    .oneOf([Yup.ref('userPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SetPasswordController = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const canceltToken = axios.CancelToken.source();

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      userPassword: '',
      userConfirmPassword: '',
    },
    validationSchema,
    onSubmit: () => {
      null;
    },
  });

  const handleSubmit = async () => {
    if (formik.dirty && formik.isValid) {
      setIsLoading(true);

      await backendAuthApi({
        url: BACKEND_API.SET_PASSWORD,
        method: 'PUT',
        cancelToken: canceltToken.token,
        data: formik.values,
      })
        .then((res) => {
          const data = res.data;

          if (responseUtil.isResponseSuccess(data.responseCode)) {
            router.push(NAVIGATION_ROUTES.dashboard);
          } else {
            enqueueSnackbar(data.responseMessage, {
              variant: responseUtil.findResponseType(data.responseCode),
            });
          }
        })
        .catch(() => {
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      enqueueSnackbar(SNACKBAR_MESSAGE.FILL_REQUIRED_FIELDS, { variant: SNACKBAR_VARIANT.WARNING });
    }
  };

  return <SetPasswordView formik={formik} isLoading={isLoading} handleSubmit={handleSubmit} />;
};

export default SetPasswordController;
