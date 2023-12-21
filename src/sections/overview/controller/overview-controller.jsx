import React, { useState } from 'react';

import { Overview } from '../view/overview-view';
import { useRouter } from 'src/routes/hooks';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';

const OverviewController = () => {
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const headLabels = ['Job Id', 'Customer', 'Service Due Date', 'Status'];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleClickJob = () => {
    router.push(NAVIGATION_ROUTES.job_details);
  };

  return (
    <Overview
      headLabels={headLabels}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleClickJob={handleClickJob}
    />
  );
};

export default OverviewController;
