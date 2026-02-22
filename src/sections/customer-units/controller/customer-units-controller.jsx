import { useEffect, useState } from 'react';
import { CustomerUnitsView } from '../view/customer-units-view';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import responseUtil from 'src/utils/responseUtil';

const CustomerUnitsController = () => {
  const { id } = useParams();
  const sourceToken = axios.CancelToken.source();

  const [units, setUnits] = useState([]);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUnits = async () => {
    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_UNITS,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: { id },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setUnits(res.data.responseData);
        } else {
          setIsError(true);
        }

        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  return <CustomerUnitsView units={units} isError={isError} isLoading={isLoading} />;
};

export default CustomerUnitsController;
