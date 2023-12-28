import React, { useEffect, useState } from 'react';

import * as Yup from 'yup';

import { CustomerView } from '../view/customer-view';
import { useFormik } from 'formik';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import axios from 'axios';
import responseUtil from 'src/utils/responseUtil';
import { useSnackbar } from 'notistack';
import { SNACKBAR_MESSAGE, SNACKBAR_VARIANT } from 'src/constants/snackbar-constants';
import { addMonths } from 'date-fns';
import { useRouter } from 'src/routes/hooks';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';

// -----------------------------------------------------

const validationSchemaAddCust = Yup.object().shape({
  customerName: Yup.string().required('Full Name is required'),
  customerAddress: Yup.string().required('Address is required'),
  customerMobile: Yup.string().required('Mobile is required'),
  customerLand: Yup.string(),
  customerEmail: Yup.string().email('Invalid email format'),
  customerUnits: Yup.array().of(
    Yup.object()
      .shape({
        unitModel: Yup.string().required('Model is required'),
        unitSerialNo: Yup.string().required('Serial number is required'),
        unitInstalledDate: Yup.string().required('Installation Date is required'),
        unitNextMaintenanceDate: Yup.string().required('Next Maintenance Date is required'),
      })
      .required('AC units not provided')
  ),
});

const CustomerController = () => {
  const headerLabels = ['Customer name', 'Address', 'Mobile No', 'Landline No', 'Email'];
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAddCust, setOpenAddCust] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);

  const [isLoadingAddCustomer, setIsLoadingAddCustomer] = useState(false);

  const cancelToken = axios.CancelToken.source();

  const formik = useFormik({
    initialValues: {
      customerName: '',
      customerAddress: '',
      customerMobile: '',
      customerEmail: '',
      customerUnits: [
        {
          unitModel: '',
          unitSerialNo: '',
          unitInstalledDate: new Date(),
          unitNextMaintenanceDate: addMonths(new Date(), 3),
        },
      ],
    },
    validationSchema: validationSchemaAddCust,
    onSubmit: () => {
      null;
    },
  });

  const handleInstallationDateChange = (date, index) => {
    formik.setFieldValue(`customerUnits[${index}].unitInstalledDate`, date);

    // Recalculate and update unitNextMaintenanceDate
    formik.setFieldValue(`customerUnits[${index}].unitNextMaintenanceDate`, addMonths(date, 3));
  };

  const handleOpenAddCustomer = () => {
    setOpenAddCust(true);
  };

  const handleCloseAddCustomer = () => {
    setOpenAddCust(false);
    formik.resetForm();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleClickRow = (id) => {
    router.push('customers/details/' + id);
  };

  const handleSubmitNewCust = async () => {
    if (formik.isValid && formik.dirty) {
      setIsLoadingAddCustomer(true);
      await backendAuthApi({
        url: BACKEND_API.CUSTOMER_ADD,
        method: 'POST',
        cancelToken: cancelToken.token,
        data: formik.values,
      })
        .then((res) => {
          const data = res.data;
          if (responseUtil.isResponseSuccess(data.responseCode)) {
            handleCloseAddCustomer();
            formik.resetForm();
            handleFetchCustomers();
          } else {
            enqueueSnackbar(data.responseMessage, {
              variant: responseUtil.findResponseType(data.responseCode),
            });
          }
        })
        .finally(() => {
          setIsLoadingAddCustomer(false);
        });
    } else {
      enqueueSnackbar(SNACKBAR_MESSAGE.FILL_REQUIRED_FIELDS, {
        variant: SNACKBAR_VARIANT.WARNING,
      });
    }
  };

  const handleFetchCustomers = async () => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.CUSTOMERS_ALL,
      method: 'GET',
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          setCustomers(data.responseData);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleFetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomerView
      isLoading={isLoading}
      customers={customers}
      openAddCust={openAddCust}
      handleOpenAddCustomer={handleOpenAddCustomer}
      handleCloseAddCustomer={handleCloseAddCustomer}
      formik={formik}
      handleInstallationDateChange={handleInstallationDateChange}
      headerLabels={headerLabels}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      isLoadingAddCustomer={isLoadingAddCustomer}
      handleSubmitNewCust={handleSubmitNewCust}
      handleClickRow={handleClickRow}
    />
  );
};

export default CustomerController;
