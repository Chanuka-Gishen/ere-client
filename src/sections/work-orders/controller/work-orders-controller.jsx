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
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchParams, setSearchParams] = useState({
    name: '',
    jobCode: '',
    qrCode: '',
    serial: '',
    mobile: '',
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

  const filteredData = data.filter((item) => {
    const customerName = item.workOrderCustomerId.customerName;
    const jobCode = item.workOrderCode;
    const qrCode = item.workOrderUnitReference.unitQrCode
      ? item.workOrderUnitReference.unitQrCode.qrCodeName
      : '';
    const serial = item.workOrderUnitReference.unitSerialNo
      ? item.workOrderUnitReference.unitSerialNo
      : '';
    const mobile = item.workOrderCustomerId.customerTel.mobile;

    const searchParamRegex = Object.entries(searchParams).reduce((acc, [key, value]) => {
      acc[key] = new RegExp(`${value}`, 'i');
      return acc;
    }, {});

    return Object.entries(searchParams).every(([key, value]) => {
      const fieldValue = { name: customerName, jobCode, qrCode, serial, mobile }[key];
      return searchParamRegex[key].test(fieldValue);
    });
  });

  const handleRowClick = (id) => {
    router.push(`work-orders/${id}`);
  };

  const handleFetchWorkOrders = async () => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.WORK_ORDERS,
      method: 'GET',
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          if (res.data.responseData.length > 0) {
            setData(res.data.responseData);
          }
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
  }, []);

  return (
    <WorkOrdrsView
      isLoading={isLoading}
      headerLabels={headerLabels}
      data={data}
      handleRowClick={handleRowClick}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleChangeSearchParam={handleChangeSearchParam}
      searchParams={searchParams}
      filteredData={filteredData}
    />
  );
};

export default WorkOrdersController;
