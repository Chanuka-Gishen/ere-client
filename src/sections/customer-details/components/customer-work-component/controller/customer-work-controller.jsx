import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CustomerWorkView } from '../view/customer-work-view';
import axios from 'axios';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';
import { useRouter } from 'src/routes/hooks';

const CustomerWorkController = ({ id, selectedUnit }) => {
  const headerLabels = [
    'Word Order Id',
    'Scheduled Date',
    'Type',
    'Status',
    'Completed Date',
    'Invoice Number',
  ];

  const router = useRouter();
  const cancelToken = axios.CancelToken.source();

  const [workOrders, setWorkOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleRowClick = (jobId) => {
    router.push(`customers/details/${id}/${jobId}`);
  };

  const handleFetchWorkOrders = async () => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.WORK_ORDRS_BY_UNIT + selectedUnit._id,
      method: 'GET',
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          setWorkOrders(data.responseData);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleFetchWorkOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUnit]);

  return (
    <CustomerWorkView
      headerLabels={headerLabels}
      isLoading={isLoading}
      workOrders={workOrders}
      handleRowClick={handleRowClick}
    />
  );
};

export default CustomerWorkController;

CustomerWorkController.propTypes = {
  id: PropTypes.string.isRequired,
  selectedUnit: PropTypes.object.isRequired,
};
