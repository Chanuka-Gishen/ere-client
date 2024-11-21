import React, { useEffect, useState } from 'react';
import { UnitsView } from '../view/unitsView';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import axios from 'axios';
import responseUtil from 'src/utils/responseUtil';
import { UNIT_ORDER_BY } from 'src/constants/orderByConstants';
import { fDateYearMonthFormat } from 'src/utils/format-time';

const UnitsController = () => {
  const headerLabels = [
    'Customer Name',
    'Mobile No',
    'Unit',
    'Last Maintainence Date',
    'Next Maintainence Date',
    'Qr Code',
  ];

  const cancelToken = axios.CancelToken.source();

  const [filters, setFilters] = useState({
    customerName: '',
    qrCode: '',
    customerMobileNumber: '',
    unitSerialNo: '',
    qrCodeLinked: null,
    unitNextMaintenanceDate: null,
    orderBy: UNIT_ORDER_BY.DATE,
  });

  const [page, setPage] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingExcel, setIsLoadingExcel] = useState(false);

  const [data, setData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangeFilters = (event, key) => {
    const { value } = event.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleFilterByLink = (e, newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      qrCodeLinked: newValue,
    }));
  };

  const handleDeleteFilterItems = (key) => {
    if (key === 'qrCodeLinked' || key === 'unitNextMaintenanceDate') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [key]: null,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [key]: '',
      }));
    }
  };

  const downloadExcelSheet = async () => {
    setIsLoadingExcel(true);

    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_DUE_UNITS,
      method: 'GET',
      cancelToken: cancelToken.token,
      responseType: 'blob',
    })
      .then((res) => {
        // Create a link element and trigger download
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `DateSheet-${new Date().toLocaleDateString('en-US')}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(() => {
        setIsLoadingExcel(false);
      })
      .finally(() => {
        setIsLoadingExcel(false);
      });
  };

  const fetchUnits = async () => {
    setIsLoading(true);
    backendAuthApi({
      url: BACKEND_API.UNITS,
      method: 'POST',
      cancelToken: cancelToken.token,
      params: {
        page: page,
        limit: rowsPerPage,
      },
      data: {
        ...filters,
        unitNextMaintenanceDate: filters.unitNextMaintenanceDate
          ? fDateYearMonthFormat(filters.unitNextMaintenanceDate)
          : null,
      },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          if (res.data.responseData.units.length > 0) {
            setData(res.data.responseData.units);
            setDocumentCount(res.data.responseData.totalCount);
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
    fetchUnits();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage, page, filters]);

  return (
    <UnitsView
      headerLabels={headerLabels}
      isLoading={isLoading}
      filters={filters}
      setFilters={setFilters}
      handleChangeFilters={handleChangeFilters}
      handleFilterByLink={handleFilterByLink}
      handleDeleteFilterItems={handleDeleteFilterItems}
      data={data}
      downloadExcelSheet={downloadExcelSheet}
      isLoadingExcel={isLoadingExcel}
      page={page}
      documentCount={documentCount}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default UnitsController;
