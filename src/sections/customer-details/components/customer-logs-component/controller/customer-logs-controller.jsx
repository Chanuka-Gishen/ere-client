import { useEffect, useState } from 'react';
import axios from 'axios';

import { CustomerLogsView } from '../view/customer-logs-view';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';

const headerLabels = ['Type', 'Send At'];

const CustomerLogsController = ({ customer }) => {
  const cancelToken = axios.CancelToken.source();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [logs, setLogs] = useState([]);
  const [logsCount, setLogsCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const message = `Hi ${customer.customerName},
This is a reminder that your air conditioner service is due soon.

You can check the due date and details here:
${import.meta.env.VITE_APP_URL}customer-units/${customer._id}

If you need any assistance, feel free to contact EREngineers (Pvt) Ltd.`;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleToggleSendRemainder = () => {
    if (!isOpen) {
      handleOpenWhatsapp();
    }
    setIsOpen(!isOpen);
  };

  const handleOpenWhatsapp = () => {
    const phone = `94${customer.customerTel.mobile.trim()}`;

    const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);

    window.open(url, '_blank');
  };

  const fetchLogs = async () => {
    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_LOGS,
      method: 'GET',
      cancelToken: cancelToken.token,
      params: { id: customer._id, page, limit: rowsPerPage },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setLogs(res.data.responseData.data);
          setLogsCount(res.data.responseData.count);
        }

        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleAddLog = async () => {
    setIsLoadingCreate(true);

    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_LOG_CREATE,
      method: 'POST',
      cancelToken: cancelToken.token,
      params: { id: customer._id },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          handleToggleSendRemainder();
          fetchLogs();
        }

        setIsLoadingCreate(false);
      })
      .catch(() => {
        setIsLoadingCreate(false);
      });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <CustomerLogsView
      headerLabels={headerLabels}
      logs={logs}
      logsCount={logsCount}
      page={page}
      rowsPerPage={rowsPerPage}
      message={message}
      isOpen={isOpen}
      isLoading={isLoading}
      isLoadingCreate={isLoadingCreate}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleToggleSendRemainder={handleToggleSendRemainder}
      handleAddLog={handleAddLog}
    />
  );
};

export default CustomerLogsController;
