import React, { useEffect, useState } from 'react';
import { EmployeeView } from '../view/employeeView';
import { useRouter } from 'src/routes/hooks';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import responseUtil from 'src/utils/responseUtil';

const EmployeeController = () => {
  const headers = [
    'Job Code',
    'Company',
    'Customer',
    'Qr Code',
    'Scheduled Date',
    'Completed Date',
    'Type',
    'Status',
    'Points',
    'Invoice Number',
  ];

  const { id } = useParams();
  const router = useRouter();

  const sourceToken = axios.CancelToken.source();

  const [jobs, setJobs] = useState([]);
  const [points, setPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [filteredDate, setFilteredDate] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [documentCount, setDocumentCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPoints, setIsLoadingPoints] = useState(true);
  const [isLoadingTotalPoints, setIsLoadingTotalPoints] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangeFilterDate = (date) => {
    setFilteredDate(date);
  };

  const handleOnClickBreadCrumb = (url) => {
    router.replace(url);
  };

  const fetchLastMonthPoints = async () => {
    setIsLoadingPoints(true);

    await backendAuthApi({
      url: BACKEND_API.EMPLOYEE_TIPS + id,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setPoints(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingPoints(false);
      })
      .finally(() => {
        setIsLoadingPoints(false);
      });
  };

  const fetchTotalPoints = async () => {
    setIsLoadingTotalPoints(true);

    await backendAuthApi({
      url: BACKEND_API.EMPLOYEE_TOTAL_TIPS + id,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setTotalPoints(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingTotalPoints(false);
      })
      .finally(() => {
        setIsLoadingTotalPoints(false);
      });
  };

  const fetchWorkOrders = async () => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.WORK_ORDR_EMP_ASSIGNED + id,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: {
        page: page,
        limit: rowsPerPage,
        filteredDate: filteredDate,
      },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setJobs(res.data.responseData.workOrders);
          setDocumentCount(res.data.responseData.documentCount);
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
    fetchWorkOrders();
    fetchLastMonthPoints();
    fetchTotalPoints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredDate, page, rowsPerPage]);

  return (
    <EmployeeView
      handleOnClickBreadCrumb={handleOnClickBreadCrumb}
      headers={headers}
      points={points}
      totalPoints={totalPoints}
      isLoadingPoints={isLoadingPoints}
      isLoadingTotalPoints={isLoadingTotalPoints}
      jobs={jobs}
      isLoading={isLoading}
      filteredDate={filteredDate}
      handleChangeFilterDate={handleChangeFilterDate}
      page={page}
      rowsPerPage={rowsPerPage}
      documentCount={documentCount}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default EmployeeController;
