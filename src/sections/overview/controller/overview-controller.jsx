import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Overview } from '../view/overview-view';
import { useRouter } from 'src/routes/hooks';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';

const OverviewController = () => {
  const router = useRouter();
  const cancelToken = axios.CancelToken.source();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [pageUJ, setPageUJ] = useState(0)
  const [rowsPerPageUJ, setRowsPerPageUJ] = useState(5)
  const [countPJ, setCountPJ] = useState(0)

  const [jobs, setJobs] = useState([]);
  const [jobsUJ, setJobsUJ] = useState([])

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUJ, setIsLoadingUJ] = useState(true);

  const headLabels = ['Work Id', 'Company', 'Customer', 'Status', 'Service Due Date', 'Type'];
  const headerLabelsUJ = ['Customer', 'Mobile', 'Date']

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangePageUJ = (event, newPage) => {
    setPageUJ(newPage);
  };

  const handleChangeRowsPerPageUJ = (event) => {
    setPageUJ(0);
    setRowsPerPageUJ(parseInt(event.target.value, 5));
  };

  const handleClickJob = (id) => {
    router.push('dashboard/overviewDetails/' + id);
  };

  const handleFetchJobsUJ = async() => {
    setIsLoadingUJ(true)

    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_MAINTAINENCE_UPCOMING,
      method: 'GET',
      cancelToken: cancelToken.token,
      params: {
        page: pageUJ,
        limit: rowsPerPageUJ,
      },
    })
      .then((res) => {
        const data = res.data;
        if (responseUtil.isResponseSuccess(data.responseCode)) {
          setJobsUJ(data.responseData.data ? data.responseData.data : []);
          setCountPJ(countPJ)
        }
      })
      .catch(() => {
        setIsLoadingUJ(false);
      })
      .finally(() => {
        setIsLoadingUJ(false);
      });
  }

  const handleFetchJobs = async () => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.EMPLOYEE_JOBS,
      method: 'POST',
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        const data = res.data;
        if (responseUtil.isResponseSuccess(data.responseCode)) {
          setJobs(data.responseData ? data.responseData : []);
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
    handleFetchJobs();
    handleFetchJobsUJ();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Overview
      headLabels={headLabels}
      headerLabelsUJ={headerLabelsUJ}
      page={page}
      rowsPerPage={rowsPerPage}
      pageUJ={pageUJ}
      rowsPerPageUJ={rowsPerPageUJ}
      countPJ={countPJ}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleClickJob={handleClickJob}
      jobs={jobs}
      jobsUJ={jobsUJ}
      isLoading={isLoading}
      isLoadingUJ={isLoadingUJ}
      handleChangePageUJ={handleChangePageUJ}
      handleChangeRowsPerPageUJ={handleChangeRowsPerPageUJ}
    />
  );
};

export default OverviewController;
