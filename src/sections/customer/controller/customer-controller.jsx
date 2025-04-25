import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CustomerView } from '../view/customer-view';

import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';

import responseUtil from 'src/utils/responseUtil';
import { useSnackbar } from 'notistack';
import { SNACKBAR_MESSAGE, SNACKBAR_VARIANT } from 'src/constants/snackbar-constants';
import { useRouter } from 'src/routes/hooks';

// -----------------------------------------------------

const validationSchemaAddCust = Yup.object().shape({
  customerName: Yup.string().required('Full Name is required'),
  customerAddress: Yup.string().required('Address is required'),
  customerMobile: Yup.string()
    .matches(/^\(?([1-9][0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Invalid mobile number')
    .required('Mobile number is required'),
  customerEmail: Yup.string().email('Invalid email format').nullable,
});

const CustomerController = () => {
  const headerLabels = ['Customer name', 'Next job date', 'Address', 'Mobile No'];
  const headerLabelsLogs = ['Customer', 'Type', 'Date'];
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [logsPage, setLogsPage] = useState(0);
  const [logsCount, setLogsCount] = useState(0);
  const [logsRowsPerPage, setLogsRowsPerPage] = useState(10);

  const [openAddCust, setOpenAddCust] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [logs, setLogs] = useState([]);

  const [isLoadingAddCustomer, setIsLoadingAddCustomer] = useState(false);
  const [isLoadingLogs, setIsLoadingLogs] = useState(true);

  const cancelToken = axios.CancelToken.source();

  const formik = useFormik({
    initialValues: {
      customerName: '',
      customerAddress: '',
      customerMobile: '',
      customerEmail: '',
    },
    validationSchema: validationSchemaAddCust,
    onSubmit: () => {
      null;
    },
  });

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

  const handleChangePageLogs = (event, newPage) => {
    setLogsPage(newPage);
  };

  const handleChangeRowsPerPageLogs = (event) => {
    setLogsPage(0);
    setLogsRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleClickRow = (id) => {
    router.push('customers/details/' + id);
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //const filteredData = customers.filter((item) => item.customerTel.mobile.includes(searchTerm));
  const filteredData = customers.filter((item) => {
    const mobileNumber = item.customerTel.mobile;
    return mobileNumber.startsWith(searchTerm);
  });

  const handleSubmitNewCust = async () => {
    if (formik.isValid && formik.dirty) {
      setIsLoadingAddCustomer(true);
      await backendAuthApi({
        url: BACKEND_API.CUSTOMER_ADD,
        method: 'POST',
        cancelToken: cancelToken.token,
        data: {
          customerName: formik.values.customerName,
          customerAddress: formik.values.customerAddress,
          customerEmail: formik.values.customerEmail === '' ? null : formik.values.customerEmail,
          customerMobile: parseInt(formik.values.customerMobile.replace(/\s/g, '')),
        },
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

  const handleFetchLogs = async () => {
    setIsLoadingLogs(true);

    await backendAuthApi({
      url: BACKEND_API.LOGS_RECENT,
      method: 'GET',
      cancelToken: cancelToken.token,
      params: {
        page: logsPage,
        limit: logsRowsPerPage,
      },
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          setLogs(data.responseData.data);
          setLogsCount(data.responseData.count);
        }
      })
      .finally(() => {
        setIsLoadingLogs(false);
      });
  };

  const handleFetchCustomers = async () => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.CUSTOMERS_ALL,
      method: 'GET',
      cancelToken: cancelToken.token,
      params: {
        page: page,
        limit: rowsPerPage,
        customerTel: searchTerm,
      },
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          setCustomers(data.responseData.data);
          setDocumentCount(data.responseData.count);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleFetchCustomers();
    handleFetchLogs()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage, page, searchTerm]);

  return (
    <CustomerView
      searchTerm={searchTerm}
      handleSearchInputChange={handleSearchInputChange}
      filteredData={filteredData}
      headerLabels={headerLabels}
      headerLabelsLogs={headerLabelsLogs}
      isLoading={isLoading}
      isLoadingLogs={isLoadingLogs}
      customers={customers}
      logs={logs}
      openAddCust={openAddCust}
      handleOpenAddCustomer={handleOpenAddCustomer}
      handleCloseAddCustomer={handleCloseAddCustomer}
      formik={formik}
      page={page}
      documentCount={documentCount}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      logsPage={logsPage}
      logsCount={logsCount}
      logsRowsPerPage={logsRowsPerPage}
      handleChangePageLogs={handleChangePageLogs}
      handleChangeRowsPerPageLogs={handleChangeRowsPerPageLogs}
      isLoadingAddCustomer={isLoadingAddCustomer}
      handleSubmitNewCust={handleSubmitNewCust}
      handleClickRow={handleClickRow}
    />
  );
};

export default CustomerController;
