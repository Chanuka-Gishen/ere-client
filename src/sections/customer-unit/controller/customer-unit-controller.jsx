import React, { useEffect, useState } from 'react';
import { CustomerUnitView } from '../view/customer-unit-view';
import axios from 'axios';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import { useParams } from 'react-router-dom';
import responseUtil from 'src/utils/responseUtil';

const CustomerUnitController = () => {
  const { id } = useParams();
  const cancelToken = axios.CancelToken.source();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleFetchUnitDetails = async () => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.QR_CODE_UNIT_HISTORY + id,
      method: 'GET',
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          setData(data.responseData);
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
    handleFetchUnitDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CustomerUnitView isLoading={isLoading} data={data} />;
};

export default CustomerUnitController;
