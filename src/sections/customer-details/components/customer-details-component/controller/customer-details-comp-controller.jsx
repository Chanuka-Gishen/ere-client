import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CustomerDetailsComponentView } from '../view/customer-details-comp-view';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import axios from 'axios';
import responseUtil from 'src/utils/responseUtil';
import { useSnackbar } from 'notistack';
import { SNACKBAR_MESSAGE, SNACKBAR_VARIANT } from 'src/constants/snackbar-constants';

//---------------------------------------------------

const validationSchema = Yup.object().shape({
  customerName: Yup.string().required('Full Name is required'),
  customerAddress: Yup.string().required('Address is required'),
  customerMobile: Yup.string()
    .matches(/^\(?([1-9][0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Invalid mobile number')
    .required('Mobile number is required'),
  customerLand: Yup.string().nullable,
  customerEmail: Yup.string().email('Invalid email format').nullable,
  customerLocation: Yup.string().nullable,
});

const CustomerDetailsComponentController = ({ id, customerInfo, setCustomerInfo }) => {
  const { enqueueSnackbar } = useSnackbar();
  const cancelToken = axios.CancelToken.source();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const formik = useFormik({
    initialValues: {
      customerName: '',
      customerAddress: '',
      customerMobile: '',
      customerLand: '',
      customerEmail: '',
      customerLocation: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      null;
    },
  });

  const handleOpen = () => {
    formik.setValues({
      customerName: customerInfo.customerName,
      customerAddress: customerInfo.customerAddress,
      customerMobile: customerInfo.customerTel.mobile,
      customerLand: customerInfo.customerTel.landline,
      customerEmail: customerInfo.customerEmail,
      customerLocation: customerInfo.customerLocation,
    });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    formik.resetForm();
  };

  const handleUpdateCustomer = async () => {
    if (formik.isValid && formik.dirty) {
      setIsLoadingUpdate(true);

      await backendAuthApi({
        url: BACKEND_API.CUSTOMER_INFO_UPDATE,
        method: 'PUT',
        cancelToken: cancelToken.token,
        data: {
          customerId: id,
          ...formik.values,
          customerMobile: parseInt(formik.values.customerMobile.replace(/\s/g, '')),
        },
      })
        .then((res) => {
          const data = res.data;

          if (responseUtil.isResponseSuccess(data.responseCode)) {
            handleFetchCustomerDetails();
            handleClose();
          } else {
            enqueueSnackbar(data.responseMessage, {
              variant: responseUtil.findResponseType(data.responseCode),
            });
          }

          setIsLoadingUpdate(false);
        })
        .catch(() => {
          setIsLoadingUpdate(false);
        });
    } else {
      enqueueSnackbar(SNACKBAR_MESSAGE.FILL_REQUIRED_FIELDS, {
        variant: SNACKBAR_VARIANT.WARNING,
      });
    }
  };

  const handleFetchCustomerDetails = async () => {
    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_INFO + id,
      method: 'GET',
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          setCustomerInfo(data.responseData);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleFetchCustomerDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomerDetailsComponentView
      isLoading={isLoading}
      customerInfo={customerInfo}
      isOpen={isOpen}
      isLoadingUpdate={isLoadingUpdate}
      formik={formik}
      handleOpen={handleOpen}
      handleClose={handleClose}
      handleUpdateCustomer={handleUpdateCustomer}
    />
  );
};

export default CustomerDetailsComponentController;

CustomerDetailsComponentController.propTypes = {
  id: PropTypes.string.isRequired,
};
