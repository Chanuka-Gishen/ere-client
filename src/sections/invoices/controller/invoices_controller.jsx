import React, { useEffect, useState } from 'react';
import { InvoicesView } from '../view/invoices_view';
import axios from 'axios';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';

const InvoicesController = () => {
  const header = [
    'Job Id',
    'Invoice No',
    'Linked Invoice No',
    'Company',
    'Customer',
    'Date',
    'Total Items (Net)',
    'Total Items (Gross)',
    'Service Chargers (Net)',
    'Service Chargers (Gross)',
    'Other Chargers (Net)',
    'Other Chargers (Gross)',
    'Discount (%)',
    'Discount',
    'Net Total',
    'Gross Total',
  ];

  const sourceToken = axios.CancelToken.source();

  const [page, setPage] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filters, setFilters] = useState({
    filteredDate: null,
    filteredLinkedInvoice: '',
    filteredMainInvoice: '',
  });

  const [data, setData] = useState([]);
  const [stats, setStats] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangeDate = (date) => {
    setFilters((pre) => ({ ...pre, filteredDate: date }));
  };

  const handleDeleteFilter = (filter) => {
    setFilters((pre) => ({ ...pre, [filter]: null }));
  };

  const handleDeleteFilterTxt = (filter) => {
    setFilters((pre) => ({ ...pre, [filter]: '' }));
  };

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const fetchStats = async () => {
    setIsLoadingStats(true);

    await backendAuthApi({
      url: BACKEND_API.WORK_ORDR_INVOICE_STATS,
      method: 'POST',
      cancelToken: sourceToken.token,
      data: filters,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setStats(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingStats(false);
      })
      .finally(() => {
        setIsLoadingStats(false);
      });
  };

  const fetchInvoices = async () => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.WORK_ORDR_ALL_INVOICES,
      method: 'POST',
      cancelToken: sourceToken.token,
      params: {
        page: page,
        limit: rowsPerPage,
      },
      data: filters,
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
    fetchInvoices();
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page, rowsPerPage]);

  return (
    <InvoicesView
      isLoading={isLoading}
      data={data}
      header={header}
      filters={filters}
      handleChangeDate={handleChangeDate}
      handleChangeFilter={handleChangeFilter}
      handleDeleteFilter={handleDeleteFilter}
      handleDeleteFilterTxt={handleDeleteFilterTxt}
      page={page}
      documentCount={documentCount}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      stats={stats}
      isLoadingStats={isLoadingStats}
    />
  );
};

export default InvoicesController;
