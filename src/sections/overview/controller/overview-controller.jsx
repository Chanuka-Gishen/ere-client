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

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const headLabels = ['Work Id', 'Company', 'Customer', 'Status', 'Service Due Date', 'Type'];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleClickJob = (id) => {
    router.push('dashboard/overviewDetails/' + id);
  };

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Overview
      headLabels={headLabels}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleClickJob={handleClickJob}
      jobs={jobs}
      isLoading={isLoading}
    />
  );
};

export default OverviewController;
