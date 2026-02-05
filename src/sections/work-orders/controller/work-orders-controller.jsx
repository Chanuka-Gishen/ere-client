import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { WorkOrdrsView } from '../view/work-orders-view';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';
import { useRouter } from 'src/routes/hooks';

const WorkOrdersController = () => {
  const headerLabels = [
    'Job Code',
    'Company',
    'Customer',
    'Mobile',
    'Qr Code',
    'Unit Serial No',
    'Scheduled Date',
    'Type',
    'Status',
    'Completed Date',
    'Invoice Number',
  ];

  const router = useRouter();
  const cancelToken = axios.CancelToken.source();

  const [page, setPage] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchParams, setSearchParams] = useState({
    name: '',
    jobCode: '',
    qrCode: '',
    invoiceNumber: '',
    mobile: '',
    company: '',
    type: '',
    serialNumber: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangeSearchParam = (param, event) => {
    setSearchParams({
      ...searchParams,
      [param]: event.target.value,
    });
  };

  const handleRowClick = (id) => {
    router.push(`work-orders/${id}`);
  };

  const handleFetchWorkOrders = async () => {
    setIsLoading(true);

    const params = {
      page: page,
      limit: rowsPerPage,
    };

    // Only add each param if it has a value
    if (searchParams.name) params.customerName = searchParams.name;
    if (searchParams.mobile) params.customerMobile = searchParams.mobile;
    if (searchParams.jobCode) params.jobCode = searchParams.jobCode;
    if (searchParams.qrCode) params.qrCode = searchParams.qrCode;
    if (searchParams.invoiceNumber) params.invoiceNumber = searchParams.invoiceNumber;
    if (searchParams.company) params.company = searchParams.company;
    if (searchParams.type) params.type = searchParams.type;
    if (searchParams.serialNumber) params.serialNumber = searchParams.serialNumber;

    await backendAuthApi({
      url: BACKEND_API.WORK_ORDERS,
      method: 'GET',
      cancelToken: cancelToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setData(res.data.responseData.data);
          setDocumentCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleFetchWorkOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, searchParams]);

  return (
    <WorkOrdrsView
      isLoading={isLoading}
      headerLabels={headerLabels}
      data={data}
      handleRowClick={handleRowClick}
      page={page}
      documentCount={documentCount}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleChangeSearchParam={handleChangeSearchParam}
      searchParams={searchParams}
    />
  );
};

export default WorkOrdersController;
