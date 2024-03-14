import React, { useEffect, useState } from 'react';
import { WorkOrdrsView } from '../view/work-orders-view';
import axios from 'axios';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';
import { useRouter } from 'src/routes/hooks';

const WorkOrdersController = () => {
  const headerLabels = [
    'Job Code',
    'Company',
    'Customer',
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
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchParamName, setSearchParamName] = useState('');
  const [searchParamJobCode, setSearchParamJobCode] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangeSearchParamName = (event) => {
    setSearchParamName(event.target.value);
  };

  const handleChangeSearchParamJobCode = (event) => {
    setSearchParamJobCode(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const customerName = item.workOrderCustomerId.customerName;
    const jobCode = item.workOrderCode;

    const searchParamRegexName = new RegExp(`${searchParamName}`, 'i');
    const searchParamRegexCode = new RegExp(`${searchParamJobCode}`, 'i');

    return (
      // If both searchParamName and searchParamJobCode are empty, return true
      (searchParamName === '' && searchParamJobCode === '') ||
      // Otherwise, apply the regular expression tests
      (searchParamName !== '' && searchParamRegexName.test(customerName)) ||
      (searchParamJobCode !== '' && searchParamRegexCode.test(jobCode))
    );
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
      searchParamName={searchParamName}
      searchParamJobCode={searchParamJobCode}
      handleChangeSearchParamName={handleChangeSearchParamName}
      handleChangeSearchParamJobCode={handleChangeSearchParamJobCode}
      filteredData={filteredData}
    />
  );
};

export default WorkOrdersController;
