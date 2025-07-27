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

    await backendAuthApi({
      url: BACKEND_API.WORK_ORDERS,
      method: 'GET',
      cancelToken: cancelToken.token,
      params: {
        page: page,
        limit: rowsPerPage,
        customerName: searchParams.name,
        customerMobile: searchParams.mobile,
        jobCode: searchParams.jobCode,
        qrCode: searchParams.qrCode,
        invoiceNumber: searchParams.invoiceNumber,
        company: searchParams.company,
        type: searchParams.type,
      },
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
